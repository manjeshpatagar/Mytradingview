import mongoose from "mongoose";

const intradayResultsSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: [true, "Stock name is required"],
      trim: true,
    },
    entry: {
      type: Number,
      required: [true, "By price is required"],
      min: 0,
    },
    exit: {
      type: Number,
      required: [true, "High of day price is required"],
      min: 0,
    },
    return: {
      type: Number,
      required: [true, "Buy target is required"],
      min: 0,
    },
    status: {
      type: String,
      required: [true, "Type is required"],
      enum: ["success"],
      lowercase: true,
    },
    profit: {
      type: String,
      required: [true, "Type is required"],
      enum: ["bye side", "sell side"],
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
