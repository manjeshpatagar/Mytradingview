// src/services/intradayService.ts
import ApiService from "./apiservice";

// Get all intraday stock picks
export const getIntradayPicks = () => {
  return ApiService.get("/intraday-stock");
};

// Add a new intraday stock pick
export const addIntradayPick = (data: any) => {
  return ApiService.post("/intraday-stock", data);
};

// Update an existing intraday stock pick
export const updateIntradayPick = (id: string, data: any) => {
  return ApiService.patch(`/intraday-stock/${id}`, data);
};

// Delete an intraday stock pick
export const deleteIntradayPick = (id: string) => {
  return ApiService.delete(`/intraday-stock/${id}`);
};
