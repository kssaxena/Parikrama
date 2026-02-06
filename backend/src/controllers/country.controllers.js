import { Admin } from "../models/admin.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createCountry = asyncHandler(async (req, res) => {
  const { name, code } = req.body;
  const { adminId } = req.params;
  const admin = await Admin.findById(adminId);
  if (!admin) {
    return new ApiError(403, "Only admins can create states");
  }
  if (!name) throw new ApiError(400, "State name is required");

  const existing = await State.findOne({ name: name.trim() });
  if (existing) throw new ApiError(409, "State already exists");

  const state = await State.create({
    name: name.trim(),
    code: code?.trim() || "",
  });

  res.status(201).json(new ApiResponse(201, state, "State created"));
});
