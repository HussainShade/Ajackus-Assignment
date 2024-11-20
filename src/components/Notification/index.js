import React from 'react';
import './index.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification-container">
      <div className="notification-message">
        {message}
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default Notification;
