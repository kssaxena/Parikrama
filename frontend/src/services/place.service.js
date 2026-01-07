import apiClient from "./apiClient";

export const getAllPlaces = () => {
  return apiClient.get("/places");
};

export const getPlacesByCity = (cityId) => {
  return apiClient.get(`/places/city/${cityId}`);
};

export const getPlaceById = (id) => {
  return apiClient.get(`/places/${id}`);
};

export const createPlace = (payload) => {
  return apiClient.post("/places", payload);
};

export const updatePlace = (id, payload) => {
  return apiClient.post(`/places/${id}`, payload);
};

export const deletePlace = (id) => {
  return apiClient.delete(`/places/${id}`);
};
