import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.models.js";
import { EnquiryDetails } from "../models/enquiry.models.js";

const createEnquiry = asyncHandler(async (req, res) => {
  const {
    enquiryType,
    contactPersonName,
    contactPersonPhone,
    contactPersonEmail,
    comments,
    fromCity,
    toCity,
    fromDate,
    toDate,
    numberOfPerson,
    cityId,
    stateId,
    placeId,
    reviewedByAdmin,
  } = req.body;

  console.log(
    enquiryType,
    contactPersonName,
    contactPersonPhone,
    contactPersonEmail,
  );

  if (
    !enquiryType ||
    !contactPersonName ||
    !contactPersonPhone ||
    !contactPersonEmail
  )
    throw new ApiError(400, "Invalid response, please try again later");

  const enquiry = await EnquiryDetails.create({
    enquiryType: enquiryType,
    formDetails: {
      contactPersonName: contactPersonName,
      contactPersonEmail: contactPersonEmail,
      contactPersonPhone: contactPersonPhone,
      comments: comments,
      fromCity: fromCity,
      toCity: toCity,
      fromDate: fromDate,
      toDate: toDate,
      numberOfPerson: numberOfPerson,
    },
    cityId: cityId,
    stateId: stateId,
    placeId: placeId,
  });
  if (!enquiry) throw new ApiError(400, "Unable to send request !");

  return res
    .status(201)
    .json(new ApiResponse(201, enquiry, "Response submitted successfully !"));
});

const getEnquiriesById = asyncHandler(async (req, res) => {
  const { adminId, enquiryId } = req.params;
  if (!adminId || !enquiryId) throw new ApiError(400, "Invalid request");

  const admin = await Admin.findById(adminId);
  if (!admin) throw new ApiError(400, "Invalid access");

  const enquiry = await EnquiryDetails.findById(enquiryId);
  if (!enquiry) throw new ApiError(400, "Enquiry not found");

  return res
    .status(201)
    .json(new ApiResponse(201, enquiry, "Data fetched successfully !"));
});

const markEnquiryAsReviewed = asyncHandler(async (req, res) => {
  const { customerFeedBack } = req.body;
  const { adminId, enquiryId } = req.params;

  console.log("from controller", customerFeedBack, adminId);

  if (!customerFeedBack || !adminId)
    throw new ApiError(400, "Not a valid request");

  const admin = await Admin.findById(adminId);
  if (!admin) throw new ApiError(400, "Invalid admin");

  const enquiry = await EnquiryDetails.findByIdAndUpdate(enquiryId, {
    customerFeedBack: customerFeedBack,
    adminId: adminId,
    reviewedByAdmin: true,
  });
  if (!enquiry)
    throw new ApiError(400, "Something went wrong, please try again later");

  return res
    .status(201)
    .json(new ApiResponse(201, enquiry, "Enquiry marked as reviewed."));
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { adminId, enquiryId } = req.body;
  const admin = await Admin.findById(adminId);
  if (!admin) throw new ApiError(400, "Invalid admin");

  const enquiry = await EnquiryDetails.findByIdAndDelete(enquiryId);
  if (!enquiry) throw new ApiError(400, "Unable to delete the enquiry");

  return res
    .status(201)
    .json(new ApiResponse(201, enquiry, "Enquiry deleted."));
});

export {
  createEnquiry,
  getEnquiriesById,
  markEnquiryAsReviewed,
  deleteEnquiry,
};
