import React, { useState } from "react";
import { ModalContext } from "./ModalContext";

const ModalState = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalState;
