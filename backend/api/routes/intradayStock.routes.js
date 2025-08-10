import express from "express";
import {
  createIntradayStock,
  getAllIntradayStocks,
  getIntradayStockById,
  updateIntradayStock,
  deleteIntradayStock,
} from "../controllers/intradayStock.controller.js";
// import { protect } from "../middleware/auth.middleware.js";
// import { adminOnly } from "../middleware/roles.middleware.js";

const router = express.Router();

// router.use(protect);

router.route("/").post(createIntradayStock).get(getAllIntradayStocks);

router
  .route("/:id")
  .get(getIntradayStockById)
  .patch(updateIntradayStock)
  .delete(deleteIntradayStock);

export default router;
