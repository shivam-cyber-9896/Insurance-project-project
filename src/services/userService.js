import {
  createAgentApi,
  getAllUsersApi,
  getUserByIdApi,
  activateUserApi,
  deactivateUserApi,
} from "../api/userApi";

// Create a new Agent account
export const createAgent = async (agentData) => {
  const response = await createAgentApi(agentData);
  return response.data;
};

// Get all users (paginated)
export const getAllUsers = async (page = 0, size = 10) => {
  const response = await getAllUsersApi(page, size);
  return response.data;
};

// Get user by ID
export const getUserById = async (userId) => {
  const response = await getUserByIdApi(userId);
  return response.data;
};

// Activate a user account
export const activateUser = async (userId, remarks = "") => {
  const response = await activateUserApi(userId, { remarks });
  return response.data;
};

// Deactivate a user account
export const deactivateUser = async (userId, remarks = "") => {
  const response = await deactivateUserApi(userId, { remarks });
  return response.data;
};
