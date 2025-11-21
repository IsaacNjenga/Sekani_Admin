import mongoose from "mongoose";
import PropertiesModel from "../models/Properties.js";
import { logActivity } from "../utils/logActivity.js";

const createProperty = async (req, res) => {
  try {
    const newProperty = new PropertiesModel(req.body);

    //logging the activity
    await logActivity(
      "property",
      newProperty._id,
      "created",
      `New ${newProperty.propertyType} listed at ${newProperty.city}, ${newProperty.county}`,
      `${newProperty.bedrooms} bedrooms, ${newProperty.bathrooms} bathrooms at ${newProperty.price}`,
      "properties"
    );

    await newProperty.save();
    res.status(201).json({ success: true, property: newProperty });
  } catch (error) {
    console.error("Error in creating property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchProperty = async (req, res) => {
  const { id } = req.query;
  try {
    const property = await PropertiesModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "propertyId",
          as: "reviews",
        },
      },
    ]);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ success: true, property });
  } catch (error) {
    console.error("Error in fetching property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchProperties = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const properties = await PropertiesModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      //join reviews
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "propertyId",
          as: "reviews",
        },
      },

      // OPTIONAL: sort reviews newest first
      {
        $addFields: {
          reviews: { $reverseArray: "$reviews" },
        },
      },
    ]);

    const totalProperties = await PropertiesModel.countDocuments();

    res.status(200).json({
      success: true,
      properties,
      currentPage: page,
      totalProperties,
      totalPages: Math.ceil(totalProperties / limit),
    });
  } catch (error) {
    console.error("Error in fetching properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchAvailableProperties = async (req, res) => {
  try {
    const availableProperty = await PropertiesModel.aggregate([
      { $match: { status: "Available" } },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "propertyId",
          as: "reviews",
        },
      },
    ]);

    res.status(200).json({ success: true, availableProperty });
  } catch (error) {
    console.log("Error in fetching available properties", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedProperty = await PropertiesModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    await logActivity(
      "property",
      updatedProperty._id,
      "updated",
      `A property was updated: ${updatedProperty.propertyType} at ${updatedProperty.city}, ${updatedProperty.county}`,
      `Priced at ${updatedProperty.price}`,
      "properties"
    );

    res.status(200).json({ success: true, property: updatedProperty });
  } catch (error) {
    console.error("Error in updating property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedProperty = await PropertiesModel.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    await logActivity(
      "property",
      deletedProperty._id,
      "deleted",
      `A property was deleted: ${deletedProperty.propertyType} at ${deletedProperty.city}, ${deletedProperty.county}`,
      "",
      "properties"
    );

    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.error("Error in deleting property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createProperty,
  fetchProperty,
  fetchProperties,
  updateProperty,
  fetchAvailableProperties,
  deleteProperty,
};
