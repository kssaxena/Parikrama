import { Router } from "express";
import {
  createUser,
  loginUser,
  refreshUserToken,
  verifyUserOtp,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/create-user").post(createUser);
router.route("/verify-user").post(verifyUserOtp);
router.route("/login-user").post(loginUser);

// Refresh token
router.route("/auth/refresh-tokens").post(refreshUserToken);

export default router;
