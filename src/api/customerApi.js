import axiosInstance from "./axiosInstance";

// Create Customer Profile
export const createCustomerApi = (data) =>
  axiosInstance.post("/customers", data);

// Get Customer By ID
export const getCustomerByIdApi = (customerId) =>
  axiosInstance.get(`/customers/${customerId}`);

// Get My Profile (logged-in customer)
export const getMyProfileApi = () =>
  axiosInstance.get("/customers/profile");

// Get All Customers (paginated)
export const getAllCustomersApi = (page = 0, size = 10) =>
  axiosInstance.get("/customers", { params: { page, size } });

// Update Customer Profile
export const updateCustomerApi = (customerId, data) =>
  axiosInstance.put(`/customers/${customerId}`, data);
