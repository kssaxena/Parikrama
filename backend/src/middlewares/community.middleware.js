import Jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

/**
 * Verify Community (Generic with role support)
 * Usage:
 * VerifyCommunity() → only checks token
 * VerifyCommunity(["Community"]) → strict role check
 */
export const VerifyCommunity = (roles = []) => {
  return (req, res, next) => {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request - No token provided");
    }

    try {
      const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // ✅ Role check (if roles passed)
      if (roles.length && !roles.includes(decoded.role)) {
        throw new ApiError(403, "Access denied - insufficient permissions");
      }

      // ✅ Attach to request
      req.community = decoded;

      next();
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token");
    }
  };
};

export const VerifyCommunityStrict = (req, res, next) => {
  const token =
    req.cookies?.AccessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request - No token");
  }

  try {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded.role !== "Community") {
      throw new ApiError(403, "Only Community can access this route");
    }

    req.community = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
