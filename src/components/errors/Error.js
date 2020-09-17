import React, { useContext } from "react";
import { ErrorContext } from "../../context/error/ErrorContext";
import { StyledError } from "./StyledError";

const Error = () => {
  const { errorMessage } = useContext(ErrorContext);
  return errorMessage !== null && <StyledError>{errorMessage}</StyledError>;
};

export default Error;
