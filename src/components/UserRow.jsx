/*
 * Folder: src/components/
 * Purpose: User Row component representing a single row in the user list table.
 * Includes initials mini avatars and department badges.
 */

import React from 'react';

function UserRow({ user, onEdit, onDelete, isDeleting }) {
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
    <tr className={`user-row ${isDeleting ? 'row-fade-out' : ''}`}>
      <td>{user.id}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={`avatar-circle-sm ${getAvatarColorClass(user.department)}`}>
            {initials}
          </div>
          <span>{user.firstName}</span>
        </div>
      </td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>
        <span className={`dept-badge dept-${user.department.toLowerCase()}`}>
          {user.department}
        </span>
      </td>
      <td>
        <div className="action-buttons">
          <button
            className="btn-icon"
            title="Edit User"
            onClick={() => onEdit(user)}
            aria-label={`Edit details for ${user.firstName} ${user.lastName}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button
            className="btn-icon"
            title="Delete User"
            onClick={() => onDelete(user)}
            aria-label={`Delete user ${user.firstName} ${user.lastName}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
export { UserRow };
