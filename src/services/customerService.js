import {
  createCustomerApi,
  getCustomerByIdApi,
  getMyProfileApi,
  getAllCustomersApi,
  updateCustomerApi,
} from "../api/customerApi";

// Create customer profile
export const createCustomer = async (customerData) => {
  const response = await createCustomerApi(customerData);
  return response.data;
};

// Get customer by ID
export const getCustomerById = async (customerId) => {
  const response = await getCustomerByIdApi(customerId);
  return response.data;
};

// Get logged-in customer's own profile
export const getMyProfile = async () => {
  const response = await getMyProfileApi();
  return response.data;
};

// Get all customers (paginated)
export const getAllCustomers = async (page = 0, size = 10) => {
  const response = await getAllCustomersApi(page, size);
  return response.data;
};

// Update customer profile
export const updateCustomer = async (customerId, customerData) => {
  const response = await updateCustomerApi(customerId, customerData);
  return response.data;
};
