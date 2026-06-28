/*
 * Folder: src/components/
 * Purpose: Full-width search bar for filtering dashboard items. Includes search icon and clear button.
 */

import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <div className="search-wrapper" style={{ position: 'relative', width: '100%' }}>
        <svg
          className="search-icon-svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none',
            transition: 'color 0.15s ease'
          }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search by first name, last name, or email..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search users"
          style={{
            width: '100%',
            padding: value ? '12px 38px 12px 42px' : '12px 16px 12px 42px', // leaves room on right for clear button
            fontFamily: 'inherit',
            fontSize: '14px',
            color: 'var(--text-main)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            outline: 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '20px',
              lineHeight: 1,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              transition: 'background-color 0.15s, color 0.15s'
            }}
            aria-label="Clear search text"
            className="search-clear-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--border-light)';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
export { SearchBar };
