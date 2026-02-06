import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    code: { type: String, trim: true }, // IN,USA etc
  },
  { timestamps: true },
);

export const Country = mongoose.model("Country", countrySchema);
