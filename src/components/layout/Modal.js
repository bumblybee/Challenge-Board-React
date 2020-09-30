import React, { useState } from "react";

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(true);

  // const handleClickOutside = () => {
  //   setModalOpen(false);
  // };

  return (
    modalOpen && (
      <div className="modal">
        <div className="modal-content">{props.children}</div>
      </div>
    )
  );
};

export default Modal;
