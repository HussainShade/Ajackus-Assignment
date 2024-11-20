import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
const fetchUsers = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Add new user
const addUser = async (userData) => {
  const response = await axios.post(BASE_URL, userData);
  return { ...userData, id: response.data.id };
};

// Update user
const updateUser = async (userData) => {
  const response = await axios.put(`${BASE_URL}/${userData.id}`, userData);
  return response.data;
};

// Delete user
const deleteUser = async (userId) => {
  await axios.delete(`${BASE_URL}/${userId}`);
};

const apiService = { fetchUsers, addUser, updateUser, deleteUser };

export default apiService;