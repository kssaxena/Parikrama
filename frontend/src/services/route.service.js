import apiClient from "./apiClient";

export const generateRoute = (payload) => {
  return apiClient.post("/routes/generate", payload);
};
