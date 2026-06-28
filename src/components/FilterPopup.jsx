/*
 * Folder: src/components/
 * Purpose: Modal-based Filter Popup for applying granular AND filters to the user list.
 */

import React, { useState, useEffect } from 'react';

function FilterPopup({ isOpen, onClose, initialFilters, onApplyFilters }) {
  const [formState, setFormState] = useState(initialFilters);

  // Sync internal form state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormState(initialFilters);
    }
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(formState);
  };

  const handleReset = () => {
    const emptyFilters = {
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    };
    setFormState(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Filter Users</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="First name..."
              value={formState.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Last name..."
              value={formState.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-input"
              placeholder="Email address..."
              value={formState.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-input"
              placeholder="Department name..."
              value={formState.department || ''}
              onChange={(e) => handleChange('department', e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
