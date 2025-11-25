import AnalyticsModel from "../models/Analytics.js";

const createAnalytics = async (req, res) => {
  try {
    const newAnalytic = new AnalyticsModel(req.body);
    await newAnalytic.save();
    return res.status(201).json({ message: "Analytics created successfully" });
  } catch (error) {
    console.error("Error in analytics creation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const incrementViews = async (req, res) => {
  const { propertyId } = req.params;
  try {
    await AnalyticsModel.findOneAndUpdate(
      { propertyId },
      { $inc: { views: 1 } },
      { upsert: true }
    );

    res.sendStatus(204); // success with no payload
  } catch (error) {
    console.error("Error in views incrementing:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const incrementClicks = async (req, res) => {
  const { propertyId } = req.params;
  try {
    await AnalyticsModel.findOneAndUpdate(
      { propertyId },
      { $inc: { clicks: 1 } },
      { upsert: true }
    );

    res.sendStatus(204);
  } catch (error) {
    console.error("Error in clicks incrementing:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchAnalytics = async (req, res) => {
  try {
    const allAnalytics = await AnalyticsModel.find({}).populate("propertyId");

    res.status(200).json({ success: true, analytics: allAnalytics });
  } catch (error) {
    console.error("Error in analytics fetch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchAnalytic = async (req, res) => {
  const { id } = req.query;
  try {
    const analytic = await AnalyticsModel.findById(id).populate("propertyId");
    if (!analytic) {
      return res.status(404).json({ message: "Analytics not found" });
    }
    res.status(200).json({ success: true, analytic });
  } catch (error) {
    console.error("Error in analytic fetch:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateAnalytics = async (req, res) => {
  const { id } = req.query;
  try {
    const updateAnalytic = await AnalyticsModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateAnalytic) {
      return res.status(404).json({ message: "Analytics not found" });
    }
    return res.status(200).json({ success: true, analytic: updateAnalytic });
  } catch (error) {
    console.error("Error in analytics updation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createAnalytics,
  fetchAnalytic,
  fetchAnalytics,
  updateAnalytics,
  incrementClicks,
  incrementViews,
};
