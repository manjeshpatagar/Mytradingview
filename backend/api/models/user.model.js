import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: { type: String, trim: true },
  password: { type: String, required: true, select: false },
  isActive: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model("User", UserSchema);
