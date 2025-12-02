import ClientModel from "../models/Client.js";
import mongoose from "mongoose";

const fetchClient = async (req, res) => {
  const { id } = req.query;
  try {
    const client = await ClientModel.findById(id);
    if (!client) {
      return res.status(400).json({ message: "Client not found" });
    }
    res.status(200).json({ success: true, client: client });
  } catch (error) {
    console.error("Error in fetching client:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchClients = async (req, res) => {
  try {
    const clients = await ClientModel.find({});
    res.status(200).json({ success: true, clients: clients });
  } catch (error) {
    console.error("Error in fetching clients:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchClientDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const clientDetails = await ClientModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "schedules",
          localField: "viewings",
          foreignField: "_id",
          as: "viewings",
        },
      },
      {
        $lookup: {
          from: "properties",
          localField: "favourites",
          foreignField: "_id",
          as: "favourites",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews",
        },
      },
    ]);
    res.status(200).json({ success: true, clientDetails: clientDetails });
  } catch (error) {
    console.error("Error when fetching client details:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { fetchClient, fetchClients, fetchClientDetails };
