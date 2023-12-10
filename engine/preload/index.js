import { contextBridge } from "electron";
import { invokeApi } from "./api";

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", { ...invokeApi });
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = { ...invokeApi };
}
