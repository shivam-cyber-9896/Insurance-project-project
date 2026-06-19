import axiosInstance from "./axiosInstance";

// Create Agent Account
export const createAgentApi = (data) =>
  axiosInstance.post("/users/agent", data);

// Get All Users (paginated)
export const getAllUsersApi = (page = 0, size = 10) =>
  axiosInstance.get("/users", { params: { page, size } });

// Get User By ID
export const getUserByIdApi = (userId) =>
  axiosInstance.get(`/users/${userId}`);

// Activate User
export const activateUserApi = (userId, data) =>
  axiosInstance.put(`/users/${userId}/activate`, data);

// Deactivate User
export const deactivateUserApi = (userId, data) =>
  axiosInstance.put(`/users/${userId}/deactivate`, data);
