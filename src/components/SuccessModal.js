import React from 'react';
import './SuccessModal.css'; // Add some CSS for the modal

const SuccessModal = ({ show, handleClose }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <h4>Success!</h4>
        <p>Your form has been submitted successfully.</p>
        <button onClick={handleClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;
