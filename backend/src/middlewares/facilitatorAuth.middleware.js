import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Facilitator } from "../models/facilitator.models.js";

export const VerifyFacilitator = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (decoded.role !== "Facilitator") {
    throw new ApiError(403, "Access denied");
  }

  const facilitator = await Facilitator.findById(decoded._id);
  if (!facilitator || !facilitator.isActive) {
    throw new ApiError(401, "Invalid facilitator");
  }

  req.user = facilitator;
  next();
});
