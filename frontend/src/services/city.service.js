import apiClient from "./apiClient";

export const getAllCities = () => {
  return apiClient.get("/cities");
};

export const getCitiesByState = (stateId) => {
  return apiClient.get(`/cities/state/${stateId}`);
};

export const createCity = (payload) => {
  return apiClient.post("/cities", payload);
};

export const updateCity = (id, payload) => {
  return apiClient.post(`/cities/${id}`, payload);
};

export const deleteCity = (id) => {
  return apiClient.delete(`/cities/${id}`);
};
