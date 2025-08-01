import { Router } from "express";
import stockNewsRoute from "./stockNews.routes.js";
import intradayResults from "./intradayResults.routes.js";
import intradayStock from "./intradayStock.routes.js";
import marketNews from "./marketNews.routes.js";
import Results from "./results.routes.js";
import authRoutes from "./auth.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/stock-news", stockNewsRoute);
router.use("/intraday-results", intradayResults);
router.use("/intraday-stock", intradayStock);
router.use("/market-news", marketNews);
router.use("/results", Results);

export default router;
