import StockNews from "../models/stockNews.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create StockNews
export const createStockNews = asyncHandler(async (req, res) => {
  const news = await StockNews.create(req.body);
  res.status(201).json(new ApiResponse(201, news, "Stock news created"));
});

// Get all StockNews
export const getAllStockNews = asyncHandler(async (req, res) => {
  const news = await StockNews.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, news));
});

// Get single StockNews by ID
export const getStockNewsById = asyncHandler(async (req, res) => {
  const news = await StockNews.findById(req.params.id);
  if (!news) throw new ApiError(404, "Stock news not found");
  res.status(200).json(new ApiResponse(200, news));
});

// Update StockNews
export const updateStockNews = asyncHandler(async (req, res) => {
  const news = await StockNews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!news) throw new ApiError(404, "Stock news not found");
  res.status(200).json(new ApiResponse(200, news, "Stock news updated"));
});

// Delete StockNews
export const deleteStockNews = asyncHandler(async (req, res) => {
  const news = await StockNews.findByIdAndDelete(req.params.id);
  if (!news) throw new ApiError(404, "Stock news not found");
  res.status(200).json(new ApiResponse(200, news, "Stock news deleted"));
});
