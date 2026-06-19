import {
  recordPaymentApi,
  getPaymentByIdApi,
  getAllPaymentsApi,
  getMyPaymentsApi,
  getPaymentsByPolicyApi,
} from "../api/paymentApi";

// Record a new payment
export const recordPayment = async (paymentData) => {
  const response = await recordPaymentApi(paymentData);
  return response.data;
};

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  const response = await getPaymentByIdApi(paymentId);
  return response.data;
};

// Get all payments (paginated)
export const getAllPayments = async (page = 0, size = 10) => {
  const response = await getAllPaymentsApi(page, size);
  return response.data;
};

// Get logged-in customer's payments (paginated)
export const getMyPayments = async (page = 0, size = 10) => {
  const response = await getMyPaymentsApi(page, size);
  return response.data;
};

// Get all payments for a specific policy
export const getPaymentsByPolicy = async (policyId) => {
  const response = await getPaymentsByPolicyApi(policyId);
  return response.data;
};
