import React, { useState } from "react";

import { ErrorContext } from "./ErrorContext";

const ErrorState = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const setError = (msg) => {
    setErrorMessage(msg);

    setTimeout(() => {
      setError(null);
    }, 8000);
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorState;
