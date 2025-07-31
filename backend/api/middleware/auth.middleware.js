import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized access. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Invalid token. User not found.");
    }

    // Check if user account is active
    if (!user.isActive) {
      throw new ApiError(
        403,
        "Your account is inactive. Please contact support."
      );
    }

    // Check if password has been changed after token was issued
    if (user.passwordChangedAt) {
      const passwordChangedTimestamp = parseInt(
        user.passwordChangedAt.getTime() / 1000,
        10
      );
      if (passwordChangedTimestamp > decoded.iat) {
        throw new ApiError(
          401,
          "Your password has been changed recently. Please log in again."
        );
      }
    }

    req.user = user;
    next();
  } catch (error) {
    // Catch JWT errors like token expiry
    throw new ApiError(401, error?.message || "Invalid token.");
  }
});
