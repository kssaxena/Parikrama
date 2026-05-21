import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.models.js";
import { generateAccessAndRefreshTokens } from "../utils/TokenGenerator.js";
import Jwt from "jsonwebtoken";
import { State } from "../models/state.models.js";
import { City } from "../models/city.models.js";
import { Place } from "../models/place.models.js";
import { Facilitator } from "../models/facilitator.models.js";
import { Promotion } from "../models/promotions.models.js";
import { TravelPackages } from "../models/package.models.js";
import { FoodCourt } from "../models/foodCourt.models.js";
import { UserSchema } from "../models/user.models.js";
import { EnquiryDetails } from "../models/enquiry.models.js";
import { Country } from "../models/country.models.js";
// import { generateUniqueEmployeePin } from "../utils/UniquePinEmployee.js";

const regenerateAdminRefreshToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;

  if (!token) throw new ApiError(401, "Unauthorized request");

  const decoded = Jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const admin = await Admin.findById(decoded._id).select("-password");
  if (!admin) throw new ApiError(401, "Invalid refresh token");

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    admin._id,
    "Admin",
  );

  return res.status(201).json(
    new ApiResponse(201, {
      user: admin,
      tokens: { AccessToken, RefreshToken },
    }),
  );
});

const registerAdmin = asyncHandler(async (req, res, next) => {
  const { name, employeeId, email, phoneNumber, password } = req.body;
  const { adminId } = req.params;
  if (!adminId) return new ApiError(400, "Invalid admin");
  const admin = await Admin.findById(adminId);
  if (!admin) {
    return new ApiError(400, "Invalid admin");
  }

  // Validation
  if (!name || !employeeId || !email || !phoneNumber || !password) {
    return next(new ApiError(400, "All fields are required"));
  }

  // Check existing admin
  const existingAdmin = await Admin.findOne({
    $or: [{ email }, { employeeId }],
  });

  if (existingAdmin) {
    return next(
      new ApiError(400, "Admin with same email or employeeId already exists"),
    );
  }

  // Create admin
  const createAdmin = await Admin.create({
    name,
    employeeId,
    email,
    phoneNumber,
    password, // hashed by pre-save hook
    // role: "Sub-Admin",
  });

  // Remove sensitive fields
  // const adminData = await Admin.findById(createAdmin._id);

  return res
    .status(201)
    .json(new ApiResponse(201, createAdmin, "Admin registered successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) throw new ApiError(401, "Invalid credentials");

  const isValid = await admin.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(
    admin._id,
    "Admin",
  );

  return res.status(200).json(
    new ApiResponse(200, {
      admin,
      tokens: {
        AccessToken,
        RefreshToken,
      },
    }),
  );
});

const dashboardData = asyncHandler(async (req, res) => {
  // states , city, country
  const state = await State.find().populate("country").sort({ createdAt: -1 });
  const city = await City.find().populate("state").sort({ createdAt: -1 });
  const country = await Country.find().sort({ createdAt: -1 });

  // food courts or kiosks
  const foodCourts = await FoodCourt.find()
    .populate("place")
    .sort({ createdAt: -1 });
  const underReviewCount = await FoodCourt.find({
    active: false,
    verified: false,
  }).select("name");

  //extras
  const users = await UserSchema.find().sort({ createdAt: -1 });

  // places
  const place = await Place.find({ isActive: true })
    .populate("city state")
    .sort({ createdAt: -1 });
  const inactivePlace = await Place.find({ isActive: false })
    .populate("city state")
    .sort({ createdAt: -1 });

  // promotions
  const promotions = await Promotion.find()
    .populate("place")
    .sort({ createdAt: -1 });
  const packages = await TravelPackages.find().sort({ createdAt: -1 });
  const enquiry = await EnquiryDetails.find({
    reviewedByAdmin: false,
  })
    .populate("stateId cityId placeId")
    .sort({ createdAt: -1 });
  const reviewedEnquiry = await EnquiryDetails.find({
    reviewedByAdmin: true,
  })
    .populate("stateId cityId placeId")
    .sort({ createdAt: -1 });

  // facilitators
  const activeFacilitator = await Facilitator.find({
    isVerified: true,
  })
    .populate("state city place")
    .sort({ createdAt: -1 });
  const inactiveFacilitator = await Facilitator.find({
    isVerified: false,
  })
    .populate("state city place")
    .sort({ createdAt: -1 });

  // const packages = await TravelPackages.find().populate("place");

  return res.status(200).json(
    new ApiResponse(200, {
      state,
      city,
      country,
      foodCourts,
      underReviewCount,
      users,
      place,
      inactivePlace,
      promotions,
      packages,
      enquiry,
      reviewedEnquiry,
      activeFacilitator,
      inactiveFacilitator,
    }),
  );
});

export {
  loginAdmin,
  regenerateAdminRefreshToken,
  registerAdmin,
  dashboardData,
};
