import React, { useContext } from "react";
import Modal from "../../components/layout/Modal";
import { ErrorContext } from "../../context/error/ErrorContext";
import { StyledError } from "../../styles/GlobalStyledComponents";

const Error = ({ discordError }) => {
  const { error } = useContext(ErrorContext);
  return (
    error !== null && (
      <Modal>
        <StyledError discordError={discordError}>{error}</StyledError>
      </Modal>
    )
  );
};

export default Error;
