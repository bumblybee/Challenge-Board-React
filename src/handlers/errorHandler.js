const errorCodeToMessage = {
  "auth.existingCredentials": "User credentials already in use. Please log in.",

  "auth.discordLoginError":
    "Discord sign in unsuccessful. If you haven't already, please sign up with Discord before logging in.",

  "auth.discordSignupError":
    "Discord sign in unsuccessful. If you've already signed up with Discord, please log in.",

  "auth.invalidCredentials": "Invalid credentials, please try again.",

  "auth.noToken":
    "Token not found or has expired. Try resetting your password again.",

  "auth.unauthorized": "You have to be logged in to do that.",

  "signup.invalidEmail": "Please enter a valid email address",

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
  return { error: "Unexpected error. Please contact support." };
};

export { handleErrors, handleErrorsArray };
