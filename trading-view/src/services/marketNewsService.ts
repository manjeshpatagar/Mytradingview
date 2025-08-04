// src/services/marketNewsService.ts
import ApiService from "./apiservice";

// Get all market news
export const getAllMarketNews = () => {
  return ApiService.get("/market-news");
};

// Get a single market news item by ID
export const getMarketNewsById = (id: string) => {
  return ApiService.get(`/market-news/${id}`);
};

// Create a new market news item
export const createMarketNews = (data: any) => {
  return ApiService.post("/market-news", data);
};

// Update existing market news by ID
export const updateMarketNews = (id: string, data: any) => {
  return ApiService.patch(`/market-news/${id}`, data);
};

// Delete a market news item by ID
export const deleteMarketNews = (id: string) => {
  return ApiService.delete(`/market-news/${id}`);
};
