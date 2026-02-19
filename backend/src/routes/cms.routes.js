import { Router } from "express";
import {
  deleteTermsSection,
  getTermsAndConditions,
  upsertHowSiteWork,
  upsertPrivacyPolicy,
  upsertTermsOfService,
} from "../controllers/cms.controllers.js";

const router = Router();

router.post("/terms/:adminId", upsertTermsOfService);
router.post("/privacy/:adminId", upsertPrivacyPolicy);
router.post("/how-site-work/:adminId", upsertHowSiteWork);

router.delete("/:section/:adminId", deleteTermsSection);

router.get("/", getTermsAndConditions);

export default router;
