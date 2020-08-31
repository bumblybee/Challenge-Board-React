const errorCodeToMessage = {
  "login.invalidCredentials": "Invalid credentials, please try again.",
  "signup.userExists":
    "User credentials already in use. Please log in or try again.",
  "signup.invalidEmail": "Email is invalid.",
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
