import React from "react";
import { StyledErrorMsg } from "../../styles/GlobalStyledComponents";

const Error = ({ children }) => {
  return <StyledErrorMsg>{children}</StyledErrorMsg>;
};

export default Error;
