import ComfyJS from 'comfy.js';
import themes from './Lights/hueThemes.js';
import bgThemes from './gradient_bg/bgThemes.js';
import changeLights from './Lights/hueControls.js';
import shoutouts from './Shoutouts/shoutouts.js';
import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const port = 3000;
const wss = new WebSocketServer({
  port: 3001,
});
const ws = new WebSocket('ws://localhost:3001/');

app.use(express.static('gradient_bg'));

app.get('/', (req, res) => {
  res.send('Hey bish');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//console.log(process.env.TWITCH_USER);
const streamFrenz = {};

const themeNames = ['fairfax', 'osaka', 'tokyo', 'motown', 'starlight'];
ComfyJS.onChat = (user, message, flags, self, extra) => {
  if (extra.customRewardId === '2e881bbe-fd0c-4223-b35b-21a8f2877f95') {
    const themeRequest = message.toLocaleLowerCase();
    if (themeNames.indexOf(themeRequest) === -1) {
      console.log('Try another theme name');
    } else {
      console.log('Switching to', themeRequest);
      const light0 = themes[themeRequest][0];
      const light1 = themes[themeRequest][1];
      changeLights(3, true, light0.hue, light0.sat, light0.bri);
      changeLights(5, true, light1.hue, light1.sat, light1.bri);
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(bgThemes[themeRequest]));
      });
    }
  }

  const userAccessor = user.toLowerCase();

  if (shoutouts[userAccessor] && !streamFrenz[userAccessor]) {
    const streamerInfo = shoutouts[userAccessor];
    streamFrenz[userAccessor] = true;
    ComfyJS.Say(
      `Shoutout to ${streamerInfo.handle}, ${streamerInfo.message}. Check them out at https://twitch.tv/${userAccessor}`
    );
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

ComfyJS.Init(process.env.TWITCH_USER, process.env.OAUTH);
