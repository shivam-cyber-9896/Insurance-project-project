import axiosInstance from "./axiosInstance";

export const registerApi = (data) =>
  axiosInstance.post("/auth/register", data);

export const loginApi = (data) =>
  axiosInstance.post("/auth/login", data);

export const verifyOtpApi = (data) =>
  axiosInstance.post("/auth/verify-otp", data);

export const resendOtpApi = (email) =>
  axiosInstance.post(
    `/auth/resend-otp?email=${email}`
  );
  