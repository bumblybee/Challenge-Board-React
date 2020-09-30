import React, { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalContext";

const Modal = ({ children, studentMenu }) => {
  const {
    showModal,
    toggleModal,
    showEditQuestionModal,
    toggleEditQuestionModal,
  } = useContext(ModalContext);

  return showModal ? (
    <div className="modal" onClick={() => toggleModal()}>
      <div className="modal-content">{children}</div>
    </div>
  ) : (
    showEditQuestionModal && (
      <div className="modal" onClick={() => toggleEditQuestionModal()}>
        <div className="modal-content">{children}</div>
      </div>
    )
  );
};

export default Modal;
