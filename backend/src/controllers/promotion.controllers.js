import { Admin } from "../models/admin.models.js";
import { Place } from "../models/place.models.js";
import { Promotion } from "../models/promotions.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadImages } from "../utils/imageKit.io.js";

export const makePromotion = asyncHandler(async (req, res) => {
  const { name, priority, placeId } = req.body;
  const { adminId } = req.params;
  if (!adminId) return ApiError(400, "Not a valid admin");

  const admin = await Admin.find({ adminId });
  if (!admin) return ApiError(400, "Not a valid admin");

  if (!name) {
    throw new ApiError(400, "Promotion name is required");
  }

  const image = req.file;
  console.log(image);

  if (!image) {
    throw new ApiError(400, "At least one image is required");
  }

  const uploadedImages = [];

  const sanitize = (str = "") =>
    str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]/g, "")
      .replace(/\s+/g, "-");

  const safeName = sanitize(name);
  const safeId = sanitize(placeId);

  const uploaded = await UploadImages(image.filename, {
    folderStructure: `all-promotions/${safeName}-${safeId}`,
  });

  uploadedImages.push({
    url: uploaded.url,
    altText: name,
    fileId: uploaded.fileId,
  });

  const promotion = await Promotion.create({
    name: name.trim(),
    images: uploadedImages,
    priority: priority,
    place: placeId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, promotion, "Promotion created successfully"));
});

export const deletePromotion = asyncHandler(async (req, res) => {
  const { promotionId } = req.params;

  if (!promotionId) {
    throw new ApiError(400, "Promotion ID is required");
  }

  const promotion = await Promotion.findById(promotionId);

  if (!promotion) {
    throw new ApiError(404, "Promotion not found");
  }

  // Collect image fileIds
  const fileIds = promotion.images.map((img) => img.fileId);

  // Delete images from ImageKit
  if (fileIds.length) {
    await DeleteBulkImage(fileIds);
  }

  // Delete promotion from DB
  await promotion.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Promotion deleted successfully"));
});

export const updatePromotionImages = asyncHandler(async (req, res) => {
  const { promotionId } = req.params;

  if (!promotionId) {
    throw new ApiError(400, "Promotion ID is required");
  }

  const promotion = await Promotion.findById(promotionId);

  if (!promotion) {
    throw new ApiError(404, "Promotion not found");
  }

  const newImages = req.files;

  if (!newImages || !newImages.length) {
    throw new ApiError(400, "New images are required");
  }

  // 🔥 Delete old images
  const oldFileIds = promotion.images.map((img) => img.fileId);
  if (oldFileIds.length) {
    await DeleteBulkImage(oldFileIds);
  }

  // 🔼 Upload new images
  const uploadedImages = [];

  for (const img of newImages) {
    const uploaded = await UploadImages(img.filename, {
      folderStructure: `all-promotions/${promotion.name
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    });

    uploadedImages.push({
      url: uploaded.url,
      altText: promotion.name,
      fileId: uploaded.fileId,
    });
  }

  // 🔁 Replace images
  promotion.images = uploadedImages;
  await promotion.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, promotion, "Promotion images updated successfully"),
    );
});

export const getAllPromotions = asyncHandler(async (req, res) => {
  const promotionsMin = await Promotion.find({ priority: "Min" });
  if (!promotionsMin) throw new ApiError(404, "No promotions found");

  const promotionsMid = await Promotion.find({ priority: "Mid" });
  if (!promotionsMid) throw new ApiError(404, "No promotions found");

  const promotionsMax = await Promotion.find({ priority: "Max" });
  if (!promotionsMax) throw new ApiError(404, "No promotions found");

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { promotionsMin, promotionsMid, promotionsMax },
        "Promotions fetched successfully",
      ),
    );
});
