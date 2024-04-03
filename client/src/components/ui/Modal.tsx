import "./Modal.css";
import React from 'react';
import { ModalProps } from '../../types/types';

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={`modalContainer ${active ? "active" : ""}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`flex justify-center items-center modalContent ${active ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
