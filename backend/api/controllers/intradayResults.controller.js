import { asyncHandler } from "../utils/asyncHandler.js";
import IntradayResults from "../models/intradayResults.model.js";

export const createIntradayResult = asyncHandler(async (req, res) => {
  const result = await IntradayResults.create(req.body);
  res.status(201).json(result);
});

export const getAllIntradayResults = asyncHandler(async (req, res) => {
  const results = await IntradayResults.find().sort({ createdAt: -1 });
  res.json(results);
});

export const getIntradayResultById = asyncHandler(async (req, res) => {
  const result = await IntradayResults.findById(req.params.id);
  if (!result) throw new Error("Intraday Result not found");
  res.json(result);
});

export const updateIntradayResult = asyncHandler(async (req, res) => {
  const updated = await IntradayResults.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updated) throw new Error("Update failed, result not found");
  res.json(updated);
});

export const deleteIntradayResult = asyncHandler(async (req, res) => {
  const deleted = await IntradayResults.findByIdAndDelete(req.params.id);
  if (!deleted) throw new Error("Delete failed, result not found");
  res.json({ message: "Intraday Result deleted" });
});
