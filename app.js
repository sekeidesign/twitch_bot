import ComfyJS from 'comfy.js';
import bgThemes from './themes.js';
import changeLights from './Lights/hueControls.js';
import toLight from './toLight.js';
import shoutouts from './Shoutouts/shoutouts.js';
import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('Socket connected');
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

app.use(express.static('gradient_bg'));

app.get('/', (req, res) => {
  res.send('Hey bish');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//**-------------------------------------------- */
const streamFrenz = {};

const themeNames = Object.keys(bgThemes);
ComfyJS.onChat = (user, message, flags, self, extra) => {
  if (extra.customRewardId === '2e881bbe-fd0c-4223-b35b-21a8f2877f95') {
    const themeRequest = message.toLowerCase();
    if (themeNames.indexOf(themeRequest) === -1) {
      console.log('Try another theme name');
    } else {
      console.log('Switching to', themeRequest);
      const light0 = toLight(bgThemes[themeRequest][0]);
      const light1 = toLight(bgThemes[themeRequest][1]);
      changeLights(3, true, light0.hue, light0.sat, light0.bri);
      changeLights(5, true, light1.hue, light1.sat, light1.bri);

      io.emit('Theme change', { theme: bgThemes[themeRequest] });
    }
  }

  const userAccessor = user.toLowerCase();

  if (shoutouts[userAccessor] && !streamFrenz[userAccessor]) {
    const streamerInfo = shoutouts[userAccessor];
    streamFrenz[userAccessor] = true;
    ComfyJS.Say(
      `Shoutout to ${streamerInfo.handle}, ${streamerInfo.message}. Check them out at https://twitch.tv/${userAccessor}`
    );
    console.log('suck my pp', userAccessor);
  }
};

ComfyJS.onRaid = (user, viewers) => {
  const userAccessor = user.toLowerCase();
  if (viewers > 1 && !streamFrenz[userAccessor]) {
    streamFrenz[userAccessor] = true;
    console.log(user, 'raided');
    ComfyJS.Say(`!so @${userAccessor}`);
  }
};

const { TWITCH_USER, OAUTH } = process.env;
ComfyJS.Init(TWITCH_USER, OAUTH);
