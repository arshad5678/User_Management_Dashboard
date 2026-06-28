/*
 * Folder: src/utils/
 * Purpose: Form validators.
 */

// Basic email validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email && emailRegex.test(email);
};

// Comprehensive form validation logic for user creation (trims fields first)
export const validateUserForm = (values) => {
  const errors = {};

  const firstName = values.firstName ? String(values.firstName).trim() : '';
  const lastName = values.lastName ? String(values.lastName).trim() : '';
  const email = values.email ? String(values.email).trim() : '';
  const department = values.department ? String(values.department).trim() : '';

  if (!firstName) {
    errors.firstName = 'First Name is required.';
  } else if (firstName.length < 2) {
    errors.firstName = 'First Name must be at least 2 characters.';
  }

  if (!lastName) {
    errors.lastName = 'Last Name is required.';
  } else if (lastName.length < 2) {
    errors.lastName = 'Last Name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!department) {
    errors.department = 'Department selection is required.';
  }

  return errors;
};
