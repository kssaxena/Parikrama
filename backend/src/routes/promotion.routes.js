import { Router } from "express";
import {
  deletePromotion,
  getAllPromotions,
  makePromotion,
} from "../controllers/promotion.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router
  .route("/make/promotions/:adminId")
  .post(upload.single("image"), makePromotion);
router.route("/get/all/promotions").get(getAllPromotions);
router.route("/delete-promotion/:adminId/:promotionId").delete(deletePromotion);

export default router;
