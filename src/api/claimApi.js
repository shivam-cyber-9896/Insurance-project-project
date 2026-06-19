import axiosInstance from "./axiosInstance";

// File a Claim
export const fileClaimApi = (data) =>
  axiosInstance.post("/claims", data);

// Get Claim By ID
export const getClaimByIdApi = (claimId) =>
  axiosInstance.get(`/claims/${claimId}`);

// Get All Claims (paginated)
export const getAllClaimsApi = (page = 0, size = 10) =>
  axiosInstance.get("/claims", { params: { page, size } });

// Get My Claims (logged-in customer, paginated)
export const getMyClaimsApi = (page = 0, size = 10) =>
  axiosInstance.get("/claims/my", { params: { page, size } });

// Review Claim (Agent)
export const reviewClaimApi = (claimId, data) =>
  axiosInstance.put(`/claims/${claimId}/review`, data);

// Claim Decision (Admin)
export const claimDecisionApi = (claimId, data) =>
  axiosInstance.put(`/claims/${claimId}/decision`, data);

// Get Claim History
export const getClaimHistoryApi = (claimId) =>
  axiosInstance.get(`/claim-history/${claimId}`);
