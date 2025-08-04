import express from "express";
import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
} from "../controllers/results.controller.js";
// import { protect } from "../middleware/auth.middleware.js";
// import { adminOnly } from "../middleware/roles.middleware.js";

const router = express.Router();

// router.use(protect);

router.route("/").post(createResult).get(getAllResults);

router
  .route("/:id")
  .get(getResultById)
  .patch(updateResult)
  .delete(deleteResult);

export default router;
