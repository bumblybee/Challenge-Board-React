import React from "react";
import Modal from "../../layout/Modal";
import { StyledError } from "../../styles/GlobalStyledComponents";

const Error = ({ children, discordError }) => {
  return (
    <Modal>
      <StyledError discordError={discordError}>{children}</StyledError>
    </Modal>
  );
};

export default Error;
