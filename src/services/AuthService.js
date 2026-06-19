import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

// Save JWT token to localStorage
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token and clear session
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Decode token and return user payload
export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

// Check if user is authenticated (token exists and not expired)
export const isAuthenticated = () => {
  const user = getUser();
  if (!user) return false;

  // Check expiration (exp is in seconds)
  if (user.exp && Date.now() >= user.exp * 1000) {
    removeToken();
    return false;
  }

  return true;
};

// Get the current user's role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

// Check if current user has a specific role
export const hasRole = (role) => {
  return getUserRole() === role;
};

// Check if current user is Admin
export const isAdmin = () => hasRole("ADMIN");

// Check if current user is Agent
export const isAgent = () => hasRole("AGENT");

// Check if current user is Customer
export const isCustomer = () => hasRole("CUSTOMER");

// Full logout — clear storage and return cleanup info
export const logout = () => {
  localStorage.clear();
};