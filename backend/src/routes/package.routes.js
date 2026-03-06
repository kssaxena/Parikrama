import { Router } from "express";
import { VerifyUser } from "../middlewares/auth.middlewares.js";

import {
  createTravelPackage,
  getAllTravelPackages,
  getTravelPackageById,
  updateTravelPackage,
  deleteTravelPackage,
} from "../controllers/package.controllers.js";

const router = Router();

router.route("/").get(getAllTravelPackages);

router.route("/:id").get(getTravelPackageById);

router.route("/register-package/:adminId").post(createTravelPackage);

router.route("/:id").post(VerifyUser, updateTravelPackage);

router.route("/delete-package/:adminId/:id").delete(deleteTravelPackage);

export default router;
