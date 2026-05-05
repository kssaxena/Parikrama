import { Router } from "express";
import {
  createEnquiry,
  getEnquiriesById,
} from "../controllers/enquiry.controllers.js";

const router = Router();

router.route("/guest/create-enquiry").post(createEnquiry);
router
  .route("/admin/get/enquiry-by-id/:adminId/:enquiryId")
  .get(getEnquiriesById);

export default router;
