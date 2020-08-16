const errorCodeToMessage = {
  "login.invalidCredentials": "Invalid credentials, please try again.",
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

export default handleErrors;
