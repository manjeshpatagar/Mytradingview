import mongoose from "mongoose";

const intradayResultsSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: [true, "Stock name is required"],
      trim: true,
    },
    byPrice: {
      type: Number,
      required: [true, "By price is required"],
      min: 0,
    },
    highOfDay: {
      type: Number,
      required: [true, "High of day price is required"],
      min: 0,
    },
    gain: {
      type: Number,
      required: [true, "Buy target is required"],
      min: 0,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["strong breakout", "strong breakdown", "short sell breakout"],
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("intradayResults", intradayResultsSchema);
