import axiosInstance from "./axiosInstance";

// Create Product
export const createProductApi = (data) =>
  axiosInstance.post("/products", data);

// Get All Products (paginated)
export const getAllProductsApi = (page = 0, size = 10) =>
  axiosInstance.get("/products", { params: { page, size } });

// Get Product By ID
export const getProductByIdApi = (productId) =>
  axiosInstance.get(`/products/${productId}`);

// Update Product
export const updateProductApi = (productId, data) =>
  axiosInstance.put(`/products/${productId}`, data);

// Deactivate Product
export const deactivateProductApi = (productId) =>
  axiosInstance.put(`/products/${productId}/deactivate`);
