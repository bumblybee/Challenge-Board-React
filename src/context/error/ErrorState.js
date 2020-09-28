import React, { useState, useMemo } from "react";

import { ErrorContext } from "./ErrorContext";

const ErrorState = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const setError = (msg) => {
    setErrorMessage(msg);

    setTimeout(() => {
      setError(null);
    }, 8000);
  };

  const value = useMemo(
    () => ({ errorMessage, setError }),
    //eslint-disable-next-line
    [errorMessage]
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorState;
