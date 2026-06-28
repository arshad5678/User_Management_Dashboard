/*
 * Folder: src/components/
 * Purpose: Table component looping through the user collection and rendering row wrappers.
 * Features: Clickable sort headers, skeleton shimmer loading rows, and CSS empty artwork.
 */

import React from 'react';
import UserRow from './UserRow';

function UserTable({ users, sortConfig, onSort, onEditUser, onDeleteUser, deletingUserId, loading }) {
  const renderSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <span className="sort-icon">↕</span>;
    }
    return sortConfig.direction === 'asc' ? (
      <span className="sort-icon">▲</span>
    ) : (
      <span className="sort-icon">▼</span>
    );
  };

  const renderHeader = (key, label) => {
    return (
      <th className="th-sortable" onClick={() => onSort(key)}>
        <div className="th-content">
          <span>{label}</span>
          {renderSortIcon(key)}
        </div>
      </th>
    );
  };

  return (
    <div className="table-responsive">
      <table className="user-table">
        <thead>
          <tr>
            {renderHeader('id', 'ID')}
            {renderHeader('firstName', 'First Name')}
            {renderHeader('lastName', 'Last Name')}
            {renderHeader('email', 'Email')}
            {renderHeader('department', 'Department')}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Shimmering skeleton rows displayed while fetching
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={`skeleton-${idx}`} className="skeleton-row">
                <td><div className="skeleton-cell id"></div></td>
                <td><div className="skeleton-cell firstName"></div></td>
                <td><div className="skeleton-cell lastName"></div></td>
                <td><div className="skeleton-cell email"></div></td>
                <td><div className="skeleton-cell department"></div></td>
                <td><div className="skeleton-cell actions"></div></td>
              </tr>
            ))
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEditUser}
                onDelete={onDeleteUser}
                isDeleting={user.id === deletingUserId}
              />
            ))
          ) : (
            // Custom CSS-only illustration empty state layout
            <tr className="empty-table-row">
              <td colSpan="6" style={{ padding: 0 }}>
                <div className="empty-state-container">
                  <div className="empty-state-illustration">
                    <div className="illustration-circle-outer"></div>
                    <div className="illustration-circle-inner">
                      <div className="illustration-glass"></div>
                    </div>
                  </div>
                  <h3 className="empty-state-title">No users found.</h3>
                  <p className="empty-state-suggestion">Try changing your search or filters.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
export { UserTable };
