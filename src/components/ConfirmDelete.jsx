/*
 * Folder: src/components/
 * Purpose: Confirmation modal dialog displayed before deleting a user from the list.
 * Includes initials colored avatar, scale animations, loading states, and ARIA tags.
 */

import React, { useEffect, useRef } from 'react';

function ConfirmDelete({ isOpen, onClose, onConfirm, user, isDeleting }) {
  const cancelBtnRef = useRef(null);

  // Focus Cancel button on modal open
  useEffect(() => {
    if (isOpen && !isDeleting) {
      const timer = setTimeout(() => {
        if (cancelBtnRef.current) {
          cancelBtnRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isDeleting]);

  // Escape key handler (blocked if currently performing api action)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isDeleting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isDeleting]);

  if (!isOpen || !user) return null;

  const initials = ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase();

  const getAvatarColorClass = (dept) => {
    const d = String(dept).toLowerCase().trim();
    if (d === 'it') return 'avatar-blue';
    if (d === 'hr') return 'avatar-amber';
    if (d === 'engineering') return 'avatar-emerald';
    if (d === 'finance') return 'avatar-indigo';
    if (d === 'sales') return 'avatar-purple';
    if (d === 'marketing') return 'avatar-rose';
    if (d === 'operations') return 'avatar-teal';
    return 'avatar-gray';
  };

  return (
    <div className="modal-overlay" onClick={isDeleting ? undefined : onClose}>
      <div
        className="modal-card modal-confirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="confirm-modal-title">Delete User</h3>
          <button
            className="modal-close-btn"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close confirmation dialog"
            style={{ fontSize: '20px', fontWeight: 'bold' }}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <p className="confirm-message">
            Are you sure you want to delete this user?<br />
            <strong>This action cannot be undone.</strong>
          </p>

          <div className="avatar-container">
            <div className={`avatar-circle ${getAvatarColorClass(user.department)}`}>
              {initials}
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-main)', fontWeight: '600' }}>
                {user.firstName} {user.lastName}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                {user.email}
              </p>
            </div>
          </div>
          
          <div className="user-details-summary" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div className="detail-item">
              <span className="detail-label">First Name:</span>
              <span className="detail-value">{user.firstName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Name:</span>
              <span className="detail-value">{user.lastName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{user.department}</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            ref={cancelBtnRef}
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Cancel deletion and close dialog"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            aria-label="Confirm deletion of user"
          >
            {isDeleting ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
export { ConfirmDelete };
