import { Facilitator } from "../models/facilitator.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerFacilitator = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, place, city, state } = req.body;

  if (!name || !phone || !password || !role || !place || !city || !state) {
    throw new ApiError(400, "Required fields missing");
  }

  const existing = await Facilitator.findOne({
    $or: [{ phone }, ...(email ? [{ email }] : [])],
  });

  if (existing) {
    throw new ApiError(409, "Facilitator already exists");
  }

  const facilitator = await Facilitator.create({
    name,
    email,
    phone,
    password,
    role,
    place,
    city,
    state,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, facilitator, "Facilitator registered successfully"),
    );
});

const loginFacilitator = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  if ((!email && !phone) || !password) {
    throw new ApiError(400, "Email/Phone and password required");
  }

  const facilitator = await Facilitator.findOne({
    ...(email ? { email } : { phone }),
  }).select("+password +refreshToken");

  if (!facilitator) {
    throw new ApiError(404, "Facilitator not found");
  }

  if (!facilitator.isActive) {
    throw new ApiError(403, "Account disabled");
  }

  const isMatch = await facilitator.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = facilitator.generateAccessToken();
  const refreshToken = facilitator.generateRefreshToken();

  facilitator.refreshToken = refreshToken;
  facilitator.lastLoginAt = new Date();
  await facilitator.save();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        facilitator,
        tokens: { accessToken, refreshToken },
      },
      "Login successful",
    ),
  );
});

const logoutFacilitator = asyncHandler(async (req, res) => {
  const facilitatorId = req.user._id;

  await Facilitator.findByIdAndUpdate(facilitatorId, {
    $unset: { refreshToken: 1 },
  });

  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

const refreshFacilitatorToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  const facilitator = await Facilitator.findOne({ refreshToken });
  if (!facilitator) {
    throw new ApiError(403, "Invalid refresh token");
  }

  const newAccessToken = facilitator.generateAccessToken();
  const newRefreshToken = facilitator.generateRefreshToken();

  facilitator.refreshToken = newRefreshToken;
  await facilitator.save();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      "Token refreshed",
    ),
  );
});

const getCurrentFacilitator = asyncHandler(async (req, res) => {
  const facilitator = await Facilitator.findById(req.user._id);

  if (!facilitator) {
    throw new ApiError(404, "Facilitator not found");
  }

  res.status(200).json(new ApiResponse(200, facilitator));
});

const updateFacilitatorProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "bio", "experienceYears", "languages"];

  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const facilitator = await Facilitator.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true },
  );

  res.status(200).json(new ApiResponse(200, facilitator, "Profile updated"));
});

const addFacilitatorSlots = asyncHandler(async (req, res) => {
  const { slots } = req.body;

  if (!Array.isArray(slots) || slots.length === 0) {
    throw new ApiError(400, "Slots array required");
  }

  const facilitator = await Facilitator.findById(req.user._id);

  slots.forEach((slot) => {
    facilitator.slots.push({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  });

  await facilitator.save();

  res.status(200).json(new ApiResponse(200, facilitator.slots, "Slots added"));
});

const bookFacilitatorSlot = asyncHandler(async (req, res) => {
  const { facilitatorId, slotId } = req.body;

  const facilitator = await Facilitator.findById(facilitatorId);
  if (!facilitator || !facilitator.isVerified) {
    throw new ApiError(404, "Facilitator unavailable");
  }

  const slot = facilitator.slots.id(slotId);
  if (!slot || slot.isBooked) {
    throw new ApiError(400, "Slot unavailable");
  }

  slot.isBooked = true;

  facilitator.bookings.push({
    user: req.user._id,
    slotId,
    bookingDate: new Date(),
    status: "Confirmed",
  });

  facilitator.totalBookings += 1;
  await facilitator.save();

  res.status(200).json(new ApiResponse(200, null, "Slot booked successfully"));
});

const verifyFacilitator = asyncHandler(async (req, res) => {
  const { facilitatorId, status, remarks } = req.body;

  const facilitator = await Facilitator.findById(facilitatorId);
  if (!facilitator) {
    throw new ApiError(404, "Facilitator not found");
  }

  facilitator.verification.status = status;
  facilitator.verification.remarks = remarks;
  facilitator.verification.verifiedBy = req.user._id;
  facilitator.verification.verifiedAt = new Date();
  facilitator.isVerified = status === "Approved";

  await facilitator.save();

  res
    .status(200)
    .json(new ApiResponse(200, facilitator, "Verification updated"));
});

export {
  registerFacilitator,
  loginFacilitator,
  logoutFacilitator,
  refreshFacilitatorToken,
  getCurrentFacilitator,
  updateFacilitatorProfile,
  addFacilitatorSlots,
  bookFacilitatorSlot,
  verifyFacilitator,
};
