import React from "react";
import { StyledError } from "../../styles/GlobalStyledComponents";

const Error = ({ children, discordError }) => {
  return <StyledError discordError={discordError}>{children}</StyledError>;
};

export default Error;
