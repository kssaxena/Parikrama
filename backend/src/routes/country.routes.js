import { Router } from "express";
import {
  createCountry,
  getAllCountry,
} from "../controllers/country.controllers.js";

const router = Router();

/* Public routes */
router.route("/admin/create-country/:adminId").post(createCountry);
router.route("/get/all-country").get(getAllCountry);

export default router;
