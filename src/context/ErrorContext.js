import { createContext } from "react";

export const ErrorContext = createContext({
  error: "",
  setError: (msg) => msg,
});

//TODO: Figure out why error component is now being rendered over black screen instead of over challenge board
//TODO: See about just adding the error component in app.js and triggering in other functions
