import ApiService from "./apiservice";

// Get all results
export const getAllResults = () => {
  return ApiService.get("/results");
};

// Create a new result
export const createResult = (data: any) => {
  return ApiService.post("/results", data);
};

// Get a single result by ID
export const getResultById = (id: string) => {
  return ApiService.get(`/results/${id}`);
};

// Update an existing result
export const updateResult = (id: string, data: any) => {
  return ApiService.patch(`/results/${id}`, data);
};

// Delete a result
export const deleteResult = (id: string) => {
  return ApiService.delete(`/results/${id}`);
};
