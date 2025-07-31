import mongoose from "mongoose";

const resultsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["earnings", "dividend", "events"],
      lowercase: true,
    },
    importance: {
      type: String,
      required: [true, "Importance is required"],
      enum: ["high", "medium", "low"],
      lowercase: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    description: {
      type: String,
      required: [true, "Description are required"],
      trim: true,
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

export default mongoose.model("Results", resultsSchema);
