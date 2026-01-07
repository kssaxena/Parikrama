import apiClient from "./apiClient";

export const getAllStates = () => {
  return apiClient.get("/states");
};

export const createState = (payload) => {
  return apiClient.post("/states", payload);
};

export const updateState = (id, payload) => {
  return apiClient.post(`/states/${id}`, payload);
};

export const deleteState = (id) => {
  return apiClient.delete(`/states/${id}`);
};
