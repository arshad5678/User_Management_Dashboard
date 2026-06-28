/*
 * Folder: src/components/
 * Purpose: Pagination control component with size selection, previous/next page traversal, and highlighted page numbers.
 */

import React from 'react';

function Pagination({ currentPage, pageSize, totalCount, onPageChange, onPageSizeChange }) {
  const totalFilteredUsers = totalCount;
  const startItem = totalFilteredUsers === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalFilteredUsers);
  const totalPages = Math.ceil(totalFilteredUsers / pageSize) || 1;

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <div className="pagination-left">
        <span className="pagination-info">
          {totalFilteredUsers === 0
            ? 'Showing 0 of 0 users'
            : `Showing ${startItem}–${endItem} of ${totalFilteredUsers} users`
          }
        </span>
        <div className="select-wrapper" style={{ display: 'inline-block' }}>
          <select
            className="select-dropdown"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Select page size"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
      </div>
      
      {totalFilteredUsers > 0 && (
        <div className="pagination-controls">
          <button
            className="btn btn-secondary btn-pagination"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            Previous
          </button>
          
          <div className="pagination-pages" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`btn-page ${currentPage === number ? 'active' : ''}`}
                onClick={() => onPageChange(number)}
                aria-label={`Go to page ${number}`}
                aria-current={currentPage === number ? 'page' : undefined}
                style={{
                  minWidth: '36px',
                  height: '36px',
                  padding: '0 6px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: currentPage === number ? 'var(--primary)' : '#ffffff',
                  color: currentPage === number ? '#ffffff' : 'var(--text-main)',
                  fontWeight: currentPage === number ? '600' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            className="btn btn-secondary btn-pagination"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
export { Pagination };
