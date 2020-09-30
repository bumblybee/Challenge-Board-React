import React, { useState } from "react";
import { ModalContext } from "./ModalContext";

const ModalState = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleEditQuestionModal = () => {
    setShowEditQuestionModal(!showEditQuestionModal);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        toggleModal,
        showEditQuestionModal,
        toggleEditQuestionModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalState;
