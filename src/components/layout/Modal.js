import React, { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalContext";

const Modal = ({ children, studentMenu }) => {
  const {
    showModal,
    toggleModal,
    showEditQuestionModal,
    toggleEditQuestionModal,
  } = useContext(ModalContext);

  const handleModalToggle = () => {
    studentMenu ? toggleEditQuestionModal() : toggleModal();
  };

  return (
    showModal ||
    (showEditQuestionModal && (
      <div className="modal" onClick={handleModalToggle}>
        <div className="modal-content">{children}</div>
      </div>
    ))
  );
};

export default Modal;
