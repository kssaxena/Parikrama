import { Router } from "express";
import { VerifyUser } from "../middlewares/auth.middlewares.js";
import { getAllStates } from "../controllers/state.controllers.js";
import { getAllCities } from "../controllers/city.controllers.js";
import { getAllPlaces } from "../controllers/place.controllers.js";
import {
  registerAdmin,
  loginAdmin,
  regenerateAdminRefreshToken,
} from "../controllers/admin.controllers.js";

const router = Router();

/* Admin dashboard data */
router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/refresh-tokens").post(regenerateAdminRefreshToken);

router.route("/states").get(getAllStates);
router.route("/cities").get(getAllCities);
router.route("/places").get(getAllPlaces);
// router.route("/states").get(VerifyUser, getAllStates);
// router.route("/cities").get(VerifyUser, getAllCities);
// router.route("/places").get(VerifyUser, getAllPlaces);

export default router;
