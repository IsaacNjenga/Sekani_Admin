import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true, // e.g. "message", "donation", "volunteer"
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      enum: ["created", "updated", "deleted"],
      required: true,
    },
    title: String, // e.g. "New message from John Doe"
    description: String, // optional longer text
  },
  { collection: "activity", timestamps: true }
);

const ActivityModel = mongoose.model("activity", activitySchema);
export default ActivityModel;
