import Results from "../models/results.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const createResult = asyncHandler(async (req, res) => {
  const result = await Results.create(req.body);
  res.status(201).json({ success: true, data: result });
});

export const getAllResults = asyncHandler(async (req, res) => {
  const results = await Results.find();
  res.status(200).json({ success: true, data: results });
});

export const getResultById = asyncHandler(async (req, res) => {
  const result = await Results.findById(req.params.id);
  if (!result) throw new ApiError(404, "Result not found");
  res.status(200).json({ success: true, data: result });
});

export const updateResult = asyncHandler(async (req, res) => {
  const result = await Results.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!result) throw new ApiError(404, "Result not found");
  res.status(200).json({ success: true, data: result });
});

export const deleteResult = asyncHandler(async (req, res) => {
  const result = await Results.findByIdAndDelete(req.params.id);
  if (!result) throw new ApiError(404, "Result not found");
  res.status(200).json({ success: true, message: "Result deleted" });
});
