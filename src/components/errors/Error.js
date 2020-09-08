import React, { useContext } from "react";
import Modal from "../../components/layout/Modal";
import { ErrorContext } from "../../context/ErrorContext";
import { StyledError } from "../../styles/GlobalStyledComponents";

const Error = ({ discordError }) => {
  const { error } = useContext(ErrorContext);
  return (
    <Modal>
      <StyledError discordError={discordError}>{error}</StyledError>
    </Modal>
  );
};

export default Error;
