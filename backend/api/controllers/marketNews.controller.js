// controllers/marketNews.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import MarketNews from "../models/marketNews.model.js";

export const createMarketNews = asyncHandler(async (req, res) => {
  const marketNews = await MarketNews.create(req.body);
  res.status(201).json(marketNews);
});

export const getAllMarketNews = asyncHandler(async (req, res) => {
  const news = await MarketNews.find().sort({ createdAt: -1 });
  res.json(news);
});

export const getMarketNewsById = asyncHandler(async (req, res) => {
  const news = await MarketNews.findById(req.params.id);
  if (!news) throw new Error("Market News not found");
  res.json(news);
});

export const updateMarketNews = asyncHandler(async (req, res) => {
  const updated = await MarketNews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) throw new Error("Update failed, news not found");
  res.json(updated);
});

export const deleteMarketNews = asyncHandler(async (req, res) => {
  const deleted = await MarketNews.findByIdAndDelete(req.params.id);
  if (!deleted) throw new Error("Delete failed, news not found");
  res.json({ message: "Market News deleted" });
});
