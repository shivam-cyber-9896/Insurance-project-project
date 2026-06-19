import axiosInstance from "./axiosInstance";

// Record Payment
export const recordPaymentApi = (data) =>
  axiosInstance.post("/payments", data);

// Get Payment By ID
export const getPaymentByIdApi = (paymentId) =>
  axiosInstance.get(`/payments/${paymentId}`);

// Get All Payments (paginated)
export const getAllPaymentsApi = (page = 0, size = 10) =>
  axiosInstance.get("/payments", { params: { page, size } });

// Get My Payments (logged-in customer, paginated)
export const getMyPaymentsApi = (page = 0, size = 10) =>
  axiosInstance.get("/payments/my", { params: { page, size } });

// Get Payments By Policy ID
export const getPaymentsByPolicyApi = (policyId) =>
  axiosInstance.get(`/payments/policy/${policyId}`);
