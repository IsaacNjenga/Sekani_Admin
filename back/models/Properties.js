import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String },
    county: { type: String },
    zip: { type: String },
    price: { type: Number },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    squareFeet: { type: Number },
    yearBuilt: { type: Number },
    propertyType: { type: String },
    listingType: { type: String },
    furnished: { type: Boolean },
    paymentOptions: { type: [String] },
    description: { type: String },
    amenities: { type: [String] },
    nearby: { type: [String] },
    status: { type: String },
    img: { type: [String] },
    agent: {
      name: { type: String },
      phone: { type: String },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "properties", timestamps: true }
);

const PropertiesModel = mongoose.model("properties", propertySchema);

export default PropertiesModel;
