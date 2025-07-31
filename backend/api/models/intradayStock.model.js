import mongoose from "mongoose";

const intradayStockSchema = new mongoose.Schema(
  {
    stockSymbol: {
      type: String,
      required: [true, "Stock Symbol is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    buyAbove: {
      type: Number,
      required: [true, "Buy above price is required"],
      min: 0,
    },
    buyTarget: {
      type: Number,
      required: [true, "Buy target is required"],
      min: 0,
    },
    sellBelow: {
      type: Number,
      required: [true, "Sell below price is required"],
      min: 0,
    },
    sellTarget: {
      type: Number,
      required: [true, "Sell target is required"],
      min: 0,
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

export default mongoose.model("IntradayStock", intradayStockSchema);
