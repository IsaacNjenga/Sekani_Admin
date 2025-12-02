import ClientModel from "../models/Client.js";
import SchedulesModel from "../models/Schedules.js";
import { logActivity } from "../utils/logActivity.js";

const createSchedule = async (req, res) => {
  const { createdBy } = req.query;
  try {
    const newSchedule = new SchedulesModel(req.body);

    await logActivity(
      "schedule",
      newSchedule._id,
      "created",
      `Viewing scheduled for ${newSchedule.date} at ${newSchedule.time}`,
      `${newSchedule.name} has scheduled to view a property on ${newSchedule.date} at ${newSchedule.time}`,
      "schedules"
    );

    await newSchedule.save();

    await ClientModel.findByIdAndUpdate(
      createdBy,
      {
        $addToSet: { viewings: newSchedule._id },
        $inc: { "stats.viewings": 1 },
      },
      { new: true }
    );

    res.status(201).json({ success: true, schedule: newSchedule });
  } catch (error) {
    console.error("Error when creating schedule:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const fetchSchedules = async (req, res) => {
  try {
    const allSchedules = await SchedulesModel.find({})
      .populate("propertyId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, schedules: allSchedules });
  } catch (error) {
    console.error("Error when fetching schedules:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const fetchSchedule = async (req, res) => {
  const { id } = req.query;
  try {
    const schedule = await SchedulesModel.findById(id).populate("propertyId");
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ success: true, schedule });
  } catch (error) {
    console.error("Error when fetching schedule:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedSchedule = await SchedulesModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    await logActivity(
      "schedule",
      updatedSchedule._id,
      "updated",
      `A viewing was updated: Set for ${updatedSchedule.date} at ${updatedSchedule.time}`,
      `${updatedSchedule.name} has scheduled to view a property on ${updatedSchedule.date} at ${updatedSchedule.time}`,
      "schedules"
    );

    res.status(200).json({ success: true, property: updatedSchedule });
  } catch (error) {
    console.error("Error when updating schedule:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id, createdBy } = req.query;
    const deletedSchedule = await SchedulesModel.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    await logActivity(
      "schedule",
      deletedSchedule._id,
      "deleted",
      `A schedule was deleted`,
      "",
      "schedules"
    );

    await ClientModel.findOneAndUpdate(
      { createdBy: _id },
      {
        $pull: { viewings: deletedSchedule._id },
        $inc: { "stats.viewings": -1 },
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    console.error("Error when deleting schedule:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const scheduleBookings = async (req, res) => {
  try {
    const { date } = req.query;
    const allocatedTime = await SchedulesModel.find({
      date,
      status: { $ne: "cancelled" },
    });
    const bookedSlots = allocatedTime.map((entry) => entry.time);

    res.status(200).json({
      success: true,
      bookedSchedules: {
        date,
        bookedSlots,
      },
    });
  } catch (error) {
    console.error("Error when fetching schedule bookings:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export {
  createSchedule,
  fetchSchedule,
  fetchSchedules,
  updateSchedule,
  deleteSchedule,
  scheduleBookings,
};
