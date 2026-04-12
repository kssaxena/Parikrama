import { Router } from "express";
import { getPlaceMetaTags } from "../controllers/place.controllers.js";

const router = Router();

/**
 * Public share route - doesn't expose API structure
 * Usage: /p/:placeId
 * This endpoint serves HTML with Open Graph meta tags for social media sharing
 */
router.route("/p/:placeId").get(getPlaceMetaTags);

export default router;
