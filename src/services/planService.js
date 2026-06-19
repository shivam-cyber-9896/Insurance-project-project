import {
  createPlanApi,
  getAllPlansApi,
  getPlanByIdApi,
  updatePlanApi,
  deactivatePlanApi,
} from "../api/planApi";

// Create a new plan
export const createPlan = async (planData) => {
  const response = await createPlanApi(planData);
  return response.data;
};

// Get all plans (paginated)
export const getAllPlans = async (page = 0, size = 10) => {
  const response = await getAllPlansApi(page, size);
  return response.data;
};

// Get plan by ID
export const getPlanById = async (planId) => {
  const response = await getPlanByIdApi(planId);
  return response.data;
};

// Update an existing plan
export const updatePlan = async (planId, planData) => {
  const response = await updatePlanApi(planId, planData);
  return response.data;
};

// Deactivate a plan
export const deactivatePlan = async (planId) => {
  const response = await deactivatePlanApi(planId);
  return response.data;
};
