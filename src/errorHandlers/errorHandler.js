const errorCodeToMessage = {
  "login.invalidCredentials": "Invalid credentials, please try again.",
  "signup.emailTaken": "Email linked to existing account. Please log in.",
  "signup.usernameTaken": "Username taken. Please try again.",
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
