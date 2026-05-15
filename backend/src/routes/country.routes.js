import { Router } from "express";
import {
  createCountry,
  getAllCountry,
  getCountryByStateId,
} from "../controllers/country.controllers.js";

const router = Router();

/* Public routes */
router.route("/admin/create-country/:adminId").post(createCountry);
router.route("/get/all-country").get(getAllCountry);
router.route("/get/country/by-stateId/:stateId").get(getCountryByStateId);

export default router;
