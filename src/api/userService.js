/*
 * Folder: src/api/
 * Purpose: Reusable API call definitions using Axios.
 */

import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const userService = {
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },
  createUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  }
};

export default userService;
export const getUsers = userService.getUsers;
export const createUser = userService.createUser;
export const updateUser = userService.updateUser;
export const deleteUser = userService.deleteUser;
