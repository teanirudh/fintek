const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  invokeApi: (args) => ipcRenderer.invoke("test-invoke", args),

  sendApi: (args) => ipcRenderer.send("test-send", args),

  receiveApi: (callback) =>
    ipcRenderer.on("test-receive", (_, data) => {
      callback(data);
    }),
});
