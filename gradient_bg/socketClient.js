const socket = io();
socket.on('Theme change', (data) => {
  const { theme } = data;
  //console.log(theme);
  const themeColours = `--gradient-color-1: #${theme[0]}; --gradient-color-2: #${theme[1]}; --gradient-color-3: #${theme[2]}; --gradient-color-4: #${theme[3]};`;
  document.getElementById('gradient-canvas').style = themeColours;
  const gradientGen = new Gradient();
  gradient.initGradient('#gradient-canvas');
});
