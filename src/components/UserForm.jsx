/*
 * Folder: src/components/
 * Purpose: Modal-based form for Adding or Editing a User.
 * Supports prefilling values, validation autofocus, submit button states, disabled overlays, and accessibility.
 */

import React, { useState, useEffect, useRef } from 'react';
import { validateUserForm } from '../utils/validators';

function UserForm({ isOpen, onClose, onSubmit, initialUser, mode, isSubmitting }) {
  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const firstInputRef = useRef(null);
  const formRef = useRef(null);

  const isEditMode = mode === 'edit';
  const validationErrors = validateUserForm(formValues);
  const isValid = Object.keys(validationErrors).length === 0;

  // Focus first input and populate values on open
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialUser) {
        setFormValues({
          firstName: initialUser.firstName || '',
          lastName: initialUser.lastName || '',
          email: initialUser.email || '',
          department: initialUser.department || ''
        });
      } else {
        setFormValues(initialFormValues);
      }
      setErrors({});
      setHasSubmitted(false);
      
      const timer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialUser, mode]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  // Dynamically update validation messages on key changes after first submit attempt
  useEffect(() => {
    if (hasSubmitted) {
      setErrors(validationErrors);
    }
  }, [formValues, hasSubmitted]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    if (isEditMode && initialUser) {
      setFormValues({
        firstName: initialUser.firstName || '',
        lastName: initialUser.lastName || '',
        email: initialUser.email || '',
        department: initialUser.department || ''
      });
    } else {
      setFormValues(initialFormValues);
    }
    setErrors({});
    setHasSubmitted(false);
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setHasSubmitted(true);
    
    if (!isValid) {
      setErrors(validationErrors);
      // Autofocus the first invalid input element
      const firstErrorField = Object.keys(validationErrors)[0];
      if (formRef.current && firstErrorField) {
        const element = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.focus();
        }
      }
    } else {
      onSubmit(formValues);
    }
  };

  return (
    <div className="modal-overlay" onClick={isSubmitting ? undefined : onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="modal-title">{isEditMode ? 'Edit User' : 'Add New User'}</h3>
          <button
            className="modal-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            style={{ fontSize: '20px', fontWeight: 'bold' }}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} ref={formRef} noValidate>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First Name <span className="required-star">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                ref={firstInputRef}
                className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                value={formValues.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Enter first name"
                disabled={isSubmitting}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                Last Name <span className="required-star">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                value={formValues.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Enter last name"
                disabled={isSubmitting}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email <span className="required-star">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                value={formValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="department">
                Department <span className="required-star">*</span>
              </label>
              <select
                id="department"
                name="department"
                className={`form-input ${errors.department ? 'form-input-error' : ''}`}
                value={formValues.department}
                onChange={(e) => handleChange('department', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select a department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Support">Support</option>
              </select>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={isSubmitting}
              aria-label="Reset form fields"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Cancel and close dialog"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || (hasSubmitted && !isValid)}
              aria-label={isEditMode ? 'Save user changes' : 'Submit new user form'}
            >
              {isEditMode
                ? (isSubmitting ? 'Saving...' : 'Save Changes')
                : (isSubmitting ? 'Adding...' : 'Add User')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
export { UserForm };
