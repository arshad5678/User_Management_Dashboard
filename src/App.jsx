import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import FilterPopup from './components/FilterPopup';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import Toast from './components/Toast';
import useUsers from './hooks/useUsers';
import { createUser, updateUser, deleteUser } from './api/userService';

function App() {
  const { users, loading, error, setUsers } = useUsers();
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter modal states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'asc'
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal, toast, and deletion styling states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // holds user object when editing
  const [userToDelete, setUserToDelete] = useState(null); // holds user object when deleting
  const [isSubmittingForm, setIsSubmittingForm] = useState(false); // form adding/saving spinner
  const [isDeletingUser, setIsDeletingUser] = useState(false); // double click protection & deleting loading
  const [deletingUserId, setDeletingUserId] = useState(null); // triggers fade-out transition
  const [toast, setToast] = useState(null);

  // Theme Management (Light / Dark mode switcher)
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
  }, [theme]);

  // Auto-reset page to 1 whenever search, filter, sort, or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters, sortConfig, pageSize]);

  // 1. Search Query filter (matches firstName OR lastName OR email)
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim();
    const searchMatch = !query || (
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );

    // 2. Active Filters filter (matches ALL active filter fields - logical AND)
    const filterMatch = Object.keys(activeFilters).every((key) => {
      const filterValue = activeFilters[key] ? activeFilters[key].toLowerCase().trim() : '';
      if (!filterValue) return true; // skip matching if filter field is empty
      const userValue = user[key] ? user[key].toLowerCase() : '';
      return userValue.includes(filterValue);
    });

    return searchMatch && filterMatch;
  });

  // 3. Sorting step
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    // Numeric comparison
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    }

    // String comparison (case-insensitive fallback)
    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();

    return sortConfig.direction === 'asc'
      ? strA.localeCompare(strB)
      : strB.localeCompare(strA);
  });

  // 4. Pagination slicing step (always applied LAST)
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return {
        key,
        direction: 'asc'
      };
    });
  };

  // Submit handler for user creation/editing
  const handleFormSubmit = async (formData) => {
    setIsSubmittingForm(true);
    if (selectedUser) {
      // EDIT MODE
      try {
        await updateUser(selectedUser.id, formData);
        
        // Update local users state list
        setUsers((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
        );

        setIsAddUserOpen(false);
        setSelectedUser(null);
        setToast({ message: '✅ User updated successfully.', type: 'success' });
      } catch (err) {
        setToast({ message: 'Unable to update user. Please try again.', type: 'error' });
      } finally {
        setIsSubmittingForm(false);
      }
    } else {
      // ADD MODE
      try {
        await createUser(formData);
        
        setIsAddUserOpen(false);

        // Generate a new ID locally
        const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
        const newId = maxId + 1;
        const newUser = { id: newId, ...formData };
        
        const updatedUsersList = [...users, newUser];
        setUsers(updatedUsersList);

        setToast({ message: '✅ User added successfully.', type: 'success' });

        // Calculate offset page redirection
        const nextFiltered = updatedUsersList.filter((user) => {
          const query = searchQuery.toLowerCase().trim();
          const searchMatch = !query || (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
          );

          const filterMatch = Object.keys(activeFilters).every((key) => {
            const filterValue = activeFilters[key] ? activeFilters[key].toLowerCase().trim() : '';
            if (!filterValue) return true;
            const userValue = user[key] ? user[key].toLowerCase() : '';
            return userValue.includes(filterValue);
          });

          return searchMatch && filterMatch;
        });

        const nextSorted = [...nextFiltered].sort((a, b) => {
          const valA = a[sortConfig.key];
          const valB = b[sortConfig.key];
          if (typeof valA === 'number' && typeof valB === 'number') {
            return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
          }
          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          return sortConfig.direction === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
        });

        const userIndex = nextSorted.findIndex((u) => u.id === newId);
        if (userIndex !== -1) {
          const targetPage = Math.ceil((userIndex + 1) / pageSize);
          setCurrentPage(targetPage);
        }
      } catch (err) {
        setToast({ message: 'Unable to add user. Please try again.', type: 'error' });
      } finally {
        setIsSubmittingForm(false);
      }
    }
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setIsAddUserOpen(true);
  };

  const handleDeleteUserClick = (user) => {
    if (isDeletingUser) return;
    setUserToDelete(user);
  };

  const handleDeleteUserConfirm = async () => {
    if (!userToDelete || isDeletingUser) return;
    
    setIsDeletingUser(true);
    try {
      await deleteUser(userToDelete.id);
      
      const targetId = userToDelete.id;
      // Close confirmation dialog first to allow row transition view in list background
      setUserToDelete(null);
      setDeletingUserId(targetId);
      
      // Delay filtering user state to allow fade-out animation to finish
      setTimeout(() => {
        setUsers((prev) => prev.filter((u) => u.id !== targetId));
        
        // Pagination check: if current page is left empty and is not first page, navigate back
        const nextFilteredCount = filteredUsers.length - 1;
        const maxPages = Math.ceil(nextFilteredCount / pageSize) || 1;
        if (currentPage > maxPages) {
          setCurrentPage(maxPages);
        }
        
        setDeletingUserId(null);
        setIsDeletingUser(false);
        setToast({ message: '✅ User deleted successfully.', type: 'success' });
      }, 300);
    } catch (err) {
      setToast({ message: 'Unable to delete user. Please try again.', type: 'error' });
      setIsDeletingUser(false);
      setUserToDelete(null);
    }
  };

  const handleClearSearchAndFilters = () => {
    setSearchQuery('');
    setActiveFilters({
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    });
  };

  // Toast automatic dismiss effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="dashboard-container">
      <Header
        onOpenFilter={() => setIsFilterOpen(true)}
        onOpenAddUser={() => {
          setSelectedUser(null);
          setIsAddUserOpen(true);
        }}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        activeFiltersCount={Object.values(activeFilters).filter((v) => v !== '').length}
      />

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-wrapper metric-icon-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Users</span>
            <span className="metric-value">{users.length}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper metric-icon-emerald">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div className="metric-content">
            <span className="metric-label">Departments</span>
            <span className="metric-value">{new Set(users.map((u) => u.department)).size}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper metric-icon-indigo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
          </div>
          <div className="metric-content">
            <span className="metric-label">Latest Addition</span>
            <span className="metric-value" style={{ fontSize: '15px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '170px' }}>
              {users.length > 0
                ? `${users[users.length - 1].firstName} ${users[users.length - 1].lastName}`
                : 'None'
              }
            </span>
          </div>
        </div>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {(searchQuery || Object.values(activeFilters).some((v) => v !== '')) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '-8px', marginBottom: '4px' }}>
          <button
            className="btn btn-secondary"
            onClick={handleClearSearchAndFilters}
            aria-label="Back to all users"
            style={{ fontSize: '13px', padding: '6px 12px', minHeight: '32px' }}
          >
            ← Back to All Users
          </button>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Showing filtered results
          </span>
        </div>
      )}
      
      <div className="content-card">
        {error && (
          <div className="status-message error-message">
            Unable to fetch users.
          </div>
        )}
        
        {!error && (
          <>
            <UserTable
              users={paginatedUsers}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEditUser={handleEditUserClick}
              onDeleteUser={handleDeleteUserClick}
              deletingUserId={deletingUserId}
              loading={loading}
            />
            {!loading && (
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={sortedUsers.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            )}
          </>
        )}
      </div>

      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        initialFilters={activeFilters}
        onApplyFilters={(filters) => {
          setActiveFilters(filters);
          setIsFilterOpen(false);
        }}
      />

      <UserForm
        isOpen={isAddUserOpen}
        onClose={() => {
          setIsAddUserOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleFormSubmit}
        initialUser={selectedUser}
        mode={selectedUser ? 'edit' : 'add'}
        isSubmitting={isSubmittingForm}
      />

      <ConfirmDelete
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUserConfirm}
        user={userToDelete}
        isDeleting={isDeletingUser}
      />

      {toast && (
        <div className="toast-container">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
