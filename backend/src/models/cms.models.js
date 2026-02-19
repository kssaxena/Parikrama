import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  points: [{ type: String }],
});

const cmsSchema = new mongoose.Schema(
  {
    termsOfService: sectionSchema,
    privacyPolicy: sectionSchema,
    howThisSiteWork: sectionSchema,
  },
  { timestamps: true },
);

export const CMSSchema = mongoose.model("CMSSchema", cmsSchema);
