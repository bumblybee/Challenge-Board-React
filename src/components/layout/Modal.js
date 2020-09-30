import React, { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalContext";

const Modal = (props) => {
  const { showModal, toggleModal } = useContext(ModalContext);

  return (
    showModal && (
      <div className="modal" onClick={() => toggleModal()}>
        <div className="modal-content">{props.children}</div>
      </div>
    )
  );

  // return (
  //   modalOpen && (
  //     <div className="modal">
  //       <div className="modal-content">{props.children}</div>
  //     </div>
  //   )
  // );
};

export default Modal;
