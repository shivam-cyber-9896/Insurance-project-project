import { getAllCustomersApi } from "../api/customerApi";
import { getAllPoliciesApi } from "../api/policyApi";
import { getAllProductsApi } from "../api/productApi";

export const getDashboardStats = async () => {
  try {
    const [customersRes, policiesRes, productsRes] = await Promise.all([
      getAllCustomersApi(0, 1),
      getAllPoliciesApi(0, 1),
      getAllProductsApi(0, 1),
    ]);

    return {
      totalCustomers: customersRes.data.totalElements,
      totalPolicies: policiesRes.data.totalElements,
      totalProducts: productsRes.data.totalElements,
      customers: customersRes.data.content,
      policies: policiesRes.data.content,
      products: productsRes.data.content,
    };
  } catch (error) {
    console.error("Error loading dashboard stats:", error);
    throw error;
  }
};