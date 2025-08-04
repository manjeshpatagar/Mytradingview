import express from "express";
import {
  createStockNews,
  getAllStockNews,
  getStockNewsById,
  updateStockNews,
  deleteStockNews,
} from "../controllers/stockNews.controller.js";

// import { protect } from "../middleware/auth.middleware.js";
// import { adminOnly } from "../middleware/roles.middleware.js";

const router = express.Router();

// router.use(protect);

router.route("/").post(createStockNews).get(getAllStockNews);

router
  .route("/:id")
  .get(getStockNewsById)
  .patch(updateStockNews)
  .delete(deleteStockNews);

export default router;
