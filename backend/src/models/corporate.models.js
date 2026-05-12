import mongoose from "mongoose";

const corporateSchema = new mongoose.Schema(
  {
    companyDetails: {
      name: { type: String, required: true },
      contactNumber: { type: String, required: true },
      email: { type: String, required: true },
      address: [{ type: String, required: true }],
      gst: { type: String },
      doe: { type: String }, // date of establishment
      // nationality: { type: String },
    },
    representativeDetails: {
      name: { type: String, required: true },
      contactNumber: { type: String, required: true },
      email: { type: String, required: true },
      designation: { type: String, required: true },
    },
    employeeDetails: [
      {
        name: String,
        contactNumber: String,
        email: String,
        aadharId: String,
        pan: String,
        passport: String,
        visa: String,
        address: String,
      },
    ],
    isAdminVerified: { type: Boolean, default: false },
    companyKYCDetails: { type: Boolean, default: false },
    otp: { type: String, default: null },
    //this below access key will be authorizing the company to access their dashboard
    accessKey: { type: Number, required: true }, // remove required from this object if we will allow guests to register there corporate
  },
  { timestamps: true },
);

export const Corporate = mongoose.model("Corporate", corporateSchema);
