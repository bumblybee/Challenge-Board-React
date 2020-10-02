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

const Modal = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const modalRef = useClickOutside(() => setModalOpen(false));

  return (
    modalOpen && (
      <StyledModal>
        <StyledModalContent ref={modalRef}>{children}</StyledModalContent>
      </StyledModal>
    )
  );
};

export default Modal;
