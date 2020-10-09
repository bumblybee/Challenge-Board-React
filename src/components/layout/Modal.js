import React from "react";

import { StyledModal, StyledModalContent } from "./StyledLayout";

import { useClickOutsideModal } from "../../hooks/useClickOutsideModal";

const Modal = ({
  children,
  modalOpen,
  setModalOpen,
  confirmationModalOpen,
  setConfirmationModalOpen,
}) => {
  const modalRef = useClickOutsideModal(() => setModalOpen(false));

  const confirmationRef = useClickOutsideModal(() => {
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
