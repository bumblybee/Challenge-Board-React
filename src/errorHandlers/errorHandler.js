const errorCodeToMessage = {
  "auth.invalidCredentials": "Invalid credentials, please try again.",

  "auth.existingCredentials":
    "User credentials already in use. Please log in or try again.",

  "auth.discordError": "Discord signup unsuccessful, please try again.",

  "post.failed": "Uh-oh, something went wrong on our end. Please try again.",

  "server.failed": "Uh-oh, something went wrong on our end. Please try again.",

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
