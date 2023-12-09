import { contextBridge, ipcRenderer } from "electron";

const api = {
  getTransactions: () => ipcRenderer.invoke("getTransactions"),
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = api;
}
