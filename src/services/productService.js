import {
  createProductApi,
  getAllProductsApi,
  getProductByIdApi,
  updateProductApi,
  deactivateProductApi,
} from "../api/productApi";

// Create a new product
export const createProduct = async (productData) => {
  const response = await createProductApi(productData);
  return response.data;
};

// Get all products (paginated)
export const getAllProducts = async (page = 0, size = 10) => {
  const response = await getAllProductsApi(page, size);
  return response.data;
};

// Get product by ID
export const getProductById = async (productId) => {
  const response = await getProductByIdApi(productId);
  return response.data;
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  const response = await updateProductApi(productId, productData);
  return response.data;
};

// Deactivate a product
export const deactivateProduct = async (productId) => {
  const response = await deactivateProductApi(productId);
  return response.data;
};
