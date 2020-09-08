import { createContext } from "react";

export const ErrorContext = createContext({
  error: "",
  setError: (msg) => msg,
});
