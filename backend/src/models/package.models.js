import mongoose from "mongoose";

const travelPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    place: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
    description: String,
    durationNight: Number,
    durationDay: Number,
    days: Number,
    price: Number,
    numberOfPerson: Number,
    tags: [String],
    isVerified: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: [
        "hotDeals",
        "trendingDeals",
        "exclusiveDeals",
        "lastMomentPackage",
      ],
      default: "lastMomentPackage",
    },
    image: [
      {
        url: String,
        fileId: String,
      },
    ],
  },
  { timestamps: true },
);

export const TravelPackages = mongoose.model(
  "TravelPackages",
  travelPackageSchema,
);
