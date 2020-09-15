import React, { useContext } from "react";
import Modal from "../../components/layout/Modal";
import { ErrorContext } from "../../context/error/ErrorContext";
import { StyledError } from "../../styles/GlobalStyledComponents";

const Error = ({ discordError }) => {
  const { errorMessage } = useContext(ErrorContext);
  return (
    errorMessage !== null && (
      <Modal>
        <StyledError discordError={discordError}>{errorMessage}</StyledError>
      </Modal>
    )
  );
};

export default Error;
