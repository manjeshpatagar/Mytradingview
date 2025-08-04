import express from "express";
import {
  createIntradayResult,
  getAllIntradayResults,
  getIntradayResultById,
  updateIntradayResult,
  deleteIntradayResult,
} from "../controllers/intradayResults.controller.js";
// import { protect } from "../middleware/auth.middleware.js";
// import { adminOnly } from "../middleware/roles.middleware.js";

const router = express.Router();

// router.use(protect);

router.route("/").post(createIntradayResult).get(getAllIntradayResults);

router
  .route("/:id")
  .get(getIntradayResultById)
  .patch(updateIntradayResult)
  .delete(deleteIntradayResult);

export default router;
