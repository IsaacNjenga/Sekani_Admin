import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
      required: true,
    },
  },
  { collection: "reviews", timestamps: true }
);

const ReviewsModel = mongoose.model("reviews", reviewSchema);
export default ReviewsModel;
