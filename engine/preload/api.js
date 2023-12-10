import { ipcRenderer } from "electron";

export const invokeApi = {
  getTransactions: () => ipcRenderer.invoke("getTransactions"),
};
