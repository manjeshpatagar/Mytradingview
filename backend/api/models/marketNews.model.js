import mongoose from "mongoose";

const marketNewsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category is required"],
      enum: ["markets", "policy", "commodities", "global", "forex"],
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
      required: [true, "Title is required"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
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

export default mongoose.model("MarketNews", marketNewsSchema);
