import { createContext } from "react";

export const ErrorContext = createContext({
  error: undefined,
  setError: (msg) => msg,
});

//TODO: See about just adding the error component in app.js or in lists and triggering in other functions
