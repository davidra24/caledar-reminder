import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/containers/modal.css';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='Modal'>
      <div className='Modal__container'>
        <button onClick={onClose} className='Modal__close-button'>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal')
  );
};
