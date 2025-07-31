import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Register
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully" });
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const token = generateToken(user._id);

  res.json({
    user: {
      id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    },
    token,
  });
});

// Get Own Profile
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) throw new ApiError(404, "User not found");

  res.json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
});
