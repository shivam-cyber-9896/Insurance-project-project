import {
  purchasePolicyApi,
  issuePolicyApi,
  getPolicyByIdApi,
  getAllPoliciesApi,
  getMyPoliciesApi,
  cancelPolicyApi,
} from "../api/policyApi";

// Purchase a policy (customer self-purchase)
export const purchasePolicy = async (policyData) => {
  const response = await purchasePolicyApi(policyData);
  return response.data;
};

// Issue a policy (admin/agent issues for a customer)
export const issuePolicy = async (policyData) => {
  const response = await issuePolicyApi(policyData);
  return response.data;
};

// Get policy by ID
export const getPolicyById = async (policyId) => {
  const response = await getPolicyByIdApi(policyId);
  return response.data;
};

// Get all policies (paginated)
export const getAllPolicies = async (page = 0, size = 10) => {
  const response = await getAllPoliciesApi(page, size);
  return response.data;
};

// Get logged-in customer's policies (paginated)
export const getMyPolicies = async (page = 0, size = 10) => {
  const response = await getMyPoliciesApi(page, size);
  return response.data;
};

// Cancel a policy
export const cancelPolicy = async (policyId) => {
  const response = await cancelPolicyApi(policyId);
  return response.data;
};
