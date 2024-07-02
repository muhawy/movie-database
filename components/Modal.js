import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg relative'>
        <button onClick={onClose} className='absolute top-2 right-2 text-black text-xxl pr-2'>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
