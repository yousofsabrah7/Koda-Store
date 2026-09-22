import apiClient from '../../config/apiClient';

// Admin only (401 = not logged in, 403 = not admin).
// Response: { success, count, users: [...] } — no query params documented,
// so search/pagination must be done client-side.
export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const updataUser = async (id, payload) => {
  const response = await apiClient.patch(`/users/${id}`, payload);
  return response.data;
};
