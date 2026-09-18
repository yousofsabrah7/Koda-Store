import apiClient from '../../config/apiClient';


export const updataUser = async (id, payload) => {
  const response = await apiClient.patch(`/users/${id}`, payload);
  return response.data;
};

