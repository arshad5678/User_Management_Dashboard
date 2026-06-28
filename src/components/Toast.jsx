/*
 * Folder: src/components/
 * Purpose: Reusable Toast Notification component to alert the user of CRUD success or error responses.
 */

import React from 'react';

function Toast({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="toast-close-btn"
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: 1,
            padding: '0 4px',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Toast;
export { Toast };
