// routes/marketNews.routes.js
import express from "express";
import {
  createMarketNews,
  getAllMarketNews,
  getMarketNewsById,
  updateMarketNews,
  deleteMarketNews,
} from "../controllers/marketNews.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createMarketNews).get(getAllMarketNews);

router
  .route("/:id")
  .get(getMarketNewsById)
  .patch(updateMarketNews)
  .delete(deleteMarketNews);

export default router;
