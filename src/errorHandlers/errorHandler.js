const errorCodeToMessage = {
  "login.invalidCredentials": "Invalid credentials, please try again.",
  "signup.invalidEmail": "Email linked to existing account. Please log in.",
  "signup.invalidUsername":
    "Username taken. Please try again.",
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
