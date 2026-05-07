import { Router } from "express";
import {
  createEnquiry,
  deleteEnquiry,
  getEnquiriesById,
  markEnquiryAsReviewed,
} from "../controllers/enquiry.controllers.js";

const router = Router();

router.route("/guest/create-enquiry").post(createEnquiry);
router
  .route("/admin/get/enquiry-by-id/:adminId/:enquiryId")
  .get(getEnquiriesById);

router
  .route("/mark-as-reviewed/:adminId/:enquiryId")
  .post(markEnquiryAsReviewed);
router.route("/delete/enquiry/:adminId/:enquiryId").post(deleteEnquiry);

export default router;
