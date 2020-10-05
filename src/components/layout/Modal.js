import React, { useState, useRef, useEffect } from "react";

import { StyledModal, StyledModalContent } from "./StyledLayout";

import { useClickOutside } from "../../hooks/clickOutside";

const Modal = ({
  children,
  modalOpen,
  setModalOpen,
  confirmationModalOpen,
  setConfirmationModalOpen,
}) => {
  const modalRef = useClickOutside(() => setModalOpen(false));

  const confirmationRef = useClickOutside(() => {
    setConfirmationModalOpen(false);
  });

  return modalOpen ? (
    <StyledModal>
      <StyledModalContent ref={modalRef}>{children}</StyledModalContent>
    </StyledModal>
  ) : confirmationModalOpen ? (
    <StyledModal>
      <StyledModalContent ref={confirmationRef}>{children}</StyledModalContent>
    </StyledModal>
  ) : (
    ""
  );
};

export default Modal;
