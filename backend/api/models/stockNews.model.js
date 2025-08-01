import mongoose from "mongoose";

const stockNewsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "category is required"],
      enum: [
        "earnings",
        "partnership",
        "business update",
        "product launch",
        "contract",
        "regulatory",
      ],
      lowercase: true,
    },
    sentiment: {
      type: String,
      required: [true, "sentiment is required"],
      enum: ["positive", "neutral", "negative"],
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "News title is required"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "summary is required"],
      trim: true,
    },
    image: {
      type: String,
      default: null,
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

export default mongoose.model("StockNews", stockNewsSchema);
