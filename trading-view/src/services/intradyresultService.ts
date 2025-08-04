// src/services/intradayResultsService.ts
import ApiService from "./apiservice";

// Get all intraday results
export const getIntradayResults = () => {
  return ApiService.get("/intraday-results");
};

// Add a new intraday result
export const addIntradayResult = (data: any) => {
  return ApiService.post("/intraday-results", data);
};

// Update an existing intraday result
export const updateIntradayResult = (id: string, data: any) => {
  return ApiService.patch(`/intraday-results/${id}`, data);
};

// Delete an intraday result
export const deleteIntradayResult = (id: string) => {
  return ApiService.delete(`/intraday-results/${id}`);
};
