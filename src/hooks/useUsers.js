/*
 * Folder: src/hooks/
 * Purpose: Custom React Hook to load user data, map details, and handle loading/error states.
 */

import { useState, useEffect } from 'react';
import { getUsers } from '../api/userService';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchAndMapUsers() {
      try {
        setLoading(true);
        setError(null);
        
        const rawUsers = await getUsers();
        
        if (isMounted) {
          // Map raw api users to the requested app structure
          const mappedUsers = rawUsers.map((user) => {
            const nameParts = user.name ? user.name.trim().split(/\s+/) : [];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            return {
              id: user.id,
              firstName,
              lastName,
              email: user.email || '',
              department: 'IT' // Default department value
            };
          });
          
          setUsers(mappedUsers);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch users.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchAndMapUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    users,
    loading,
    error,
    setUsers
  };
}

export default useUsers;
export { useUsers };
