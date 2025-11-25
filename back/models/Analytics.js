import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
      required: true,
      index: true,      // Faster queries when filtering by property
    },

    // Count how many times property has been opened
    views: {
      type: Number,
      default: 0,
      min: 0,           // Prevent negative values
    },

    // Count click actions (e.g. contact agent, view map, etc)
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Track unique visitors (optional but powerful)
    uniqueVisitors: {
      type: [String],    // store IP or userId
      default: [],
      select: false,     // Do not return huge arrays by default
    },

    // Daily breakdown for charts
    dailyStats: [
      {
        date: { type: String },    // "2025-11-26"
        views: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
      },
    ],

    // Geo-level analytics (optional)
    countryStats: [
      {
        country: String,
        views: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
      },
    ],
  },
  { collection: "analytics", timestamps: true }
);

// Create compound index for fast analytic dashboard queries
analyticsSchema.index({ propertyId: 1, "dailyStats.date": 1 });

const AnalyticsModel = mongoose.model("analytics", analyticsSchema);
export default AnalyticsModel;
