const { app, BrowserWindow } = require("electron");

const isDev = require("electron-is-dev");

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    isDev ? "http://localhost:3000" : `${app.getAppPath()}\\build\\index.html`
  );
});
