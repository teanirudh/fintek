import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const ipcRenderer = window.require("electron").ipcRenderer;

const App = () => {
  const [note, setNote] = useState("");

  return (
    <div>
      <input
        type="text"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button
        onClick={() => {
          ipcRenderer.send("note", note);
        }}
      >
        Send
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
