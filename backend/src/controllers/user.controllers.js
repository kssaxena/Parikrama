import { Admin } from "../models/admin.models.js";
import { City } from "../models/city.models.js";
import { Place } from "../models/place.models.js";
import { State } from "../models/state.models.js";
import { UserSchema } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  const contactNumber = req.body;

  const user = await UserSchema.find({ contactNumber });
  //   if(user) call the login function here it self
  if (!user)
    throw new ApiError(
      400,
      "New user please enter the OTP we shared on your contact number ",
    );

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // this step will ask for having a sms function.
});

export { createUser };
