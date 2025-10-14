import PropertiesModel from "../models/Properties.js";
import { logActivity } from "../utils/logActivity.js";

const createProperty = async (req, res) => {
  try {
    //TODO: tie image to cloudinary
    const newProperty = new PropertiesModel(req.body);

    //logging the activity
    await logActivity(
      "property",
      newProperty._id,
      "created",
      `New ${newProperty.propertyType} listed at ${newProperty.city}, ${newProperty.county}, ${newProperty.zip}`,
      `${newProperty.bedrooms} bedrooms, ${newProperty.bathrooms} bathrooms at ${newProperty.price}`
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
    const property = await PropertiesModel.findById(id);
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
  const page = req.query.page || 1;
  const limit = req.query.limit || 8;
  const skip = (page - 1) * limit;

  try {
    const properties = await PropertiesModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
    const availableProperty = await PropertiesModel.find({
      status: "Available",
    });
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
      `${updatedProperty.propertyType} was updated`,
      `Priced at ${updatedProperty.price}`
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
      `${deletedProperty.propertyType} was deleted`
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
