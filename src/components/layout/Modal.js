import React, { useState, useRef, useEffect } from "react";

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
      <div className="modal">
        <div className="modal-content" ref={modalRef}>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
