webSocket = new WebSocket('ws://localhost:3001/');
webSocket.binaryType = 'blob';

webSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  const themeColours = `--gradient-color-1: #${data[0]}; --gradient-color-2: #${data[1]}; --gradient-color-3: #${data[2]}; --gradient-color-4: #${data[3]};`;
  document.getElementById('gradient-canvas').style = themeColours;
  const gradientGen = new Gradient();
  gradient.initGradient('#gradient-canvas');
};
