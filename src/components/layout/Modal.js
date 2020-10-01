import React, { useState } from "react";

const Modal = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleClickOutside = () => {
    setModalOpen(false);
  };

  return (
    modalOpen && (
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    )
  );
};

export default Modal;
