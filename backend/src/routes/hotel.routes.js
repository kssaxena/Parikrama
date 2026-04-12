import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createHotel,
  getAllHotels,
  getHotelById,
  getHotelsByCity,
  getHotelsByState,
  searchHotels,
  updateHotel,
  deleteHotel,
  getInactiveHotelById,
  activateHotel,
  addHotelReview,
  getHotelReviews,
  getFeaturedHotels,
} from "../controllers/hotel.controllers.js";

const router = Router();

/* Public routes */
router.route("/").get(getAllHotels);
router.route("/featured").get(getFeaturedHotels);
router.route("/search").get(searchHotels);
router.route("/:id").get(getHotelById);
router.route("/city/:query").get(getHotelsByCity);
router.route("/state/:query").get(getHotelsByState);
router.route("/reviews/:hotelId").get(getHotelReviews);
router.route("/review/:hotelId").post(addHotelReview);

/* Admin routes */
router.route("/create/:adminId").post(
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createHotel,
);
router.route("/update/:hotelId").post(
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateHotel,
);
router.route("/delete/:adminId/:hotelId").delete(deleteHotel);
router.route("/inactive/:hotelId").get(getInactiveHotelById);
router.route("/activate/:hotelId").post(activateHotel);

export default router;
