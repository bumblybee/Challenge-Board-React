import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import App from "./App";

Sentry.init({
  dsn:
    "https://a7b36644597b4d06b355587a1147fe77@o450602.ingest.sentry.io/5435222",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
