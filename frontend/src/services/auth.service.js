import apiClient from "./apiClient";

export const registerUser = (payload) => {
  return apiClient.post("/users/register", payload);
};

export const loginUser = (payload) => {
  return apiClient.post("/users/login", payload);
};

export const getCurrentUser = (userId) => {
  return apiClient.get(`/users/admin/get-current-user/${userId}`);
};
