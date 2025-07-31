import { asyncHandler } from "../utils/asyncHandler.js";
import IntradayStock from "../models/intradayStock.model.js";

export const createIntradayStock = asyncHandler(async (req, res) => {
  const stock = await IntradayStock.create(req.body);
  res.status(201).json(stock);
});

export const getAllIntradayStocks = asyncHandler(async (req, res) => {
  const stocks = await IntradayStock.find().sort({ createdAt: -1 });
  res.json(stocks);
});

export const getIntradayStockById = asyncHandler(async (req, res) => {
  const stock = await IntradayStock.findById(req.params.id);
  if (!stock) throw new Error("Intraday Stock not found");
  res.json(stock);
});

export const updateIntradayStock = asyncHandler(async (req, res) => {
  const updated = await IntradayStock.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) throw new Error("Update failed, stock not found");
  res.json(updated);
});

export const deleteIntradayStock = asyncHandler(async (req, res) => {
  const deleted = await IntradayStock.findByIdAndDelete(req.params.id);
  if (!deleted) throw new Error("Delete failed, stock not found");
  res.json({ message: "Intraday Stock deleted" });
});
