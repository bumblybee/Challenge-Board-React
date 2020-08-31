const errorCodeToMessage = {
  "auth.invalidCredentials": "Invalid credentials, please try again.",
  "auth.existingCredentials":
    "User credentials already in use. Please log in or try again.",
  "signup.invalidEmail": "Email is invalid.",
  "server.notFound": "Oops, looks like that doesn't exist.",
};

const handleErrorsArray = (array) => {
  const errors = array.map(handleErrors);
  return errors;
};

const handleErrors = (errorCode) => {
  const errorMessage = errorCodeToMessage[errorCode];
  if (errorMessage) {
    return {
      error: errorMessage,
    };
  }
  return { Error: "Unexpected error." };
};

export { handleErrors, handleErrorsArray };
