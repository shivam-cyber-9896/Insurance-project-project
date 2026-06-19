import axiosInstance from "./axiosInstance";

// Purchase Policy (customer self-purchase)
export const purchasePolicyApi = (data) =>
  axiosInstance.post("/policies/purchase", data);

// Issue Policy (admin/agent issues for a customer)
export const issuePolicyApi = (data) =>
  axiosInstance.post("/policies/issue", data);

// Get Policy By ID
export const getPolicyByIdApi = (policyId) =>
  axiosInstance.get(`/policies/${policyId}`);

// Get All Policies (paginated)
export const getAllPoliciesApi = (page = 0, size = 10) =>
  axiosInstance.get("/policies", { params: { page, size } });

// Get My Policies (logged-in customer, paginated)
export const getMyPoliciesApi = (page = 0, size = 10) =>
  axiosInstance.get("/policies/my", { params: { page, size } });

// Cancel Policy
export const cancelPolicyApi = (policyId) =>
  axiosInstance.put(`/policies/${policyId}/cancel`);
