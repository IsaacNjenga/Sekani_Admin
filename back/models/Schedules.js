import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, required: false },
    numberOfPeople: { type: String, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "cancelled"],
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
      required: true,
    },
  },
  { collection: "schedules", timestamps: true }
);

const SchedulesModel = mongoose.model("schedules", scheduleSchema);
export default SchedulesModel;
