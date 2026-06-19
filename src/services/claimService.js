import {
  fileClaimApi,
  getClaimByIdApi,
  getAllClaimsApi,
  getMyClaimsApi,
  reviewClaimApi,
  claimDecisionApi,
  getClaimHistoryApi,
} from "../api/claimApi";

// File a new claim
export const fileClaim = async (claimData) => {
  const response = await fileClaimApi(claimData);
  return response.data;
};

// Get claim by ID
export const getClaimById = async (claimId) => {
  const response = await getClaimByIdApi(claimId);
  return response.data;
};

// Get all claims (paginated)
export const getAllClaims = async (page = 0, size = 10) => {
  const response = await getAllClaimsApi(page, size);
  return response.data;
};

// Get logged-in customer's claims (paginated)
export const getMyClaims = async (page = 0, size = 10) => {
  const response = await getMyClaimsApi(page, size);
  return response.data;
};

// Review a claim (Agent role)
export const reviewClaim = async (claimId, reviewData) => {
  const response = await reviewClaimApi(claimId, reviewData);
  return response.data;
};

// Make final decision on a claim (Admin role)
export const claimDecision = async (claimId, decisionData) => {
  const response = await claimDecisionApi(claimId, decisionData);
  return response.data;
};

// Get claim history for a specific claim
export const getClaimHistory = async (claimId) => {
  const response = await getClaimHistoryApi(claimId);
  return response.data;
};
