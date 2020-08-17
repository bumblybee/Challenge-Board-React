import React from "react";
import { StyledErrorMsg } from "../../styles/styledComponents";

const Error = ({ children }) => {
  return <StyledErrorMsg>{children}</StyledErrorMsg>;
};

export default Error;
