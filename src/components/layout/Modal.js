import React, { useState, useRef, useEffect } from "react";

import { StyledModal, StyledModalContent } from "./StyledLayout";

const useClickOutside = (cb) => {
  const domNode = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return domNode;
};

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

  // if (confirmationModalOpen) {
  //   return (
  //     <StyledModal>
  //       <StyledModalContent ref={confirmationRef}>
  //         {children}
  //       </StyledModalContent>
  //     </StyledModal>
  //   );
  // }
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
