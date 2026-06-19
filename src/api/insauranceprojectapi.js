import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const TOKEN =
  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBpbnN1cmFuY2UuY29tIiwiaWF0IjoxNzgxNzYyODg1LCJleHAiOjE3ODE4NDkyODV9.JBqAEhyVwq5Y_Kuf416FLuixIXxDuEkmBLrUOSY42w_rxlEz9zs6RMO1fjGuXPQS";
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export const getAllCustomersApi = (page = 0, size = 10) => {
  return axios.get(
    `${BASE_URL}/customers?page=${page}&size=${size}`,
    { headers }
  );
};

export const getAllPoliciesApi = (page = 0, size = 10) => {
  return axios.get(
    `${BASE_URL}/policies?page=${page}&size=${size}`,
    { headers }
  );
};
export const getAllProductsApi = (page = 0, size = 10) => {
  return axios.get(
    `${BASE_URL}/products?page=${page}&size=${size}`,
    { headers }
  );
};