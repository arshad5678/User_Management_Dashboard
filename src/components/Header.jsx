/*
 * Folder: src/components/
 * Purpose: Header component showing dashboard title, action controls, and theme switchers.
 */

import React from 'react';

function Header({ onOpenFilter, onOpenAddUser, theme, onToggleTheme, activeFiltersCount }) {
  const isDark = theme === 'dark';

  return (
    <header className="dashboard-header">
      <h1 className="dashboard-title">User Management Dashboard</h1>
      <div className="header-actions">
        <button
          className="btn btn-secondary"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          style={{ width: '40px', padding: 0 }}
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        <button
          className="btn btn-secondary"
          onClick={onOpenFilter}
          aria-label={`Open filter popup. ${activeFiltersCount || 0} active filters.`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filter
          {activeFiltersCount > 0 && (
            <span
              className="filter-badge"
              style={{
                marginLeft: '6px',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '18px',
                height: '18px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </button>
        <button
          className="btn btn-primary"
          onClick={onOpenAddUser}
          aria-label="Open add user dialog"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add User
        </button>
      </div>
    </header>
  );
}

export default Header;
export { Header };
