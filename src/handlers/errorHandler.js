const errorCodeToMessage = {
  "auth.existingCredentials": "User credentials already in use. Please log in.",

  "auth.discordError": "Discord sign in unsuccessful, please try again.",

  "auth.discordLoginError":
    "Discord sign in unsuccessful. If you haven't already, please sign up with Discord before logging in.",

  "auth.discordSignupError": "Discord sign in unsuccessful, please try again.",

  "auth.invalidCredentials": "Invalid credentials, please try again.",

  "auth.noToken":
    "Token not found or has expired. Try resetting your password again.",

  "post.failed": "Uh-oh, something went wrong. Please try again.",

  "delete.failed": "Oops, something went wrong. Please try again.",

  "server.failed": "Uh-oh, something went wrong. Please try again.",

  "server.notFound": "Oops, looks like that doesn't exist.",

  "DiscordHTTPError: 400 Bad Request on POST /api/v7/oauth2/token":
    "Discord sign in unsuccessful. If you haven't already, please sign up with Discord before logging in.",
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
