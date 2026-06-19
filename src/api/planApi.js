import axiosInstance from "./axiosInstance";

// Create Plan
export const createPlanApi = (data) =>
  axiosInstance.post("/plans", data);

// Get All Plans (paginated)
export const getAllPlansApi = (page = 0, size = 10) =>
  axiosInstance.get("/plans", { params: { page, size } });

// Get Plan By ID
export const getPlanByIdApi = (planId) =>
  axiosInstance.get(`/plans/${planId}`);

// Update Plan
export const updatePlanApi = (planId, data) =>
  axiosInstance.put(`/plans/${planId}`, data);

// Deactivate Plan
export const deactivatePlanApi = (planId) =>
  axiosInstance.put(`/plans/${planId}/deactivate`);
