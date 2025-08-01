// src/services/stockNewsService.ts
import ApiService from "./apiservice";

// Get all stock news
export const getAllStockNews = () => {
  return ApiService.get("/stock-news");
};

// Get a single stock news item by ID
export const getStockNewsById = (id: string) => {
  return ApiService.get(`/stock-news/${id}`);
};

// Add a new stock news item
export const createStockNews = (data: any) => {
  return ApiService.post("/stock-news", data);
};

// Update an existing stock news item
export const updateStockNews = (id: string, data: any) => {
  return ApiService.patch(`/stock-news/${id}`, data);
};

// Delete a stock news item
export const deleteStockNews = (id: string) => {
  return ApiService.delete(`/stock-news/${id}`);
};
