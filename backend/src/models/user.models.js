import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    address: { type: String },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    otp: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export const UserSchema = mongoose.model("UserSchema", userSchema);
