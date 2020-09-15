import React, { useReducer } from "react";

import { ErrorContext } from "./ErrorContext";
import ErrorReducer from "./ErrorReducer";

const ErrorState = ({ children }) => {
  const initState = { error: undefined };

  const setError = async (msg) => {
    dispatch({ type: "SET_ERROR", payload: msg });
  };

  const [state, dispatch] = useReducer(ErrorReducer, initState);

  return (
    <ErrorContext.Provider value={{ error: state.error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorState;
