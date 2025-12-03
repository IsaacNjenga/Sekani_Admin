import { connectDB } from "../config/db.js";
import ClientModel from "../models/Client.js";

const fetchClient = async (req, res) => {
  await connectDB();
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
  await connectDB();
  try {
    const clients = await ClientModel.find({});
    res.status(200).json({ success: true, clients: clients });
  } catch (error) {
    console.error("Error in fetching clients:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchClientDetails = async (req, res) => {
  await connectDB();
  const { email } = req.query;
  try {
    const clientDetails = await ClientModel.aggregate([
      { $match: { email } },
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
          pipeline: [
            // Now inside favourites pipeline, lookup analytics
            {
              $lookup: {
                from: "analytics",
                localField: "_id",
                foreignField: "propertyId",
                as: "analytics",
              },
            },
            // optional: add calculated totals
            {
              $addFields: {
                totalClicks: { $sum: "$analytics.clicks" },
                totalViews: { $sum: "$analytics.views" },
              },
            },
          ],
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
    res
      .status(200)
      .json({ success: true, clientDetails: clientDetails[0] || null });
  } catch (error) {
    console.error("Error when fetching client details:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { fetchClient, fetchClients, fetchClientDetails };
