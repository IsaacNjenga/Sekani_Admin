import express from "express";

import {
  ChangePassword,
  Login,
  Register,
} from "../controllers/authController.js";

import { deleteAvatar, updateAvatar } from "../controllers/userController.js";

import {
  createProperty,
  deleteProperty,
  fetchAvailableProperties,
  fetchProperties,
  fetchProperty,
  updateProperty,
} from "../controllers/propertiesController.js";

import protectRoute from "../middleware/auth.middleware.js";

import {
  createMail,
  emailUpdate,
  readMail,
  readMails,
} from "../controllers/mailController.js";

import {
  createReply,
  fetchReplies,
  fetchReply,
} from "../controllers/repliesController.js";
import {
  replyToEmail,
  scheduleEmail,
} from "../controllers/emailReplyController.js";
import { fetchActivities } from "../controllers/activityController.js";
import {
  deleteReview,
  createReview,
  fetchReviews,
  updateReview,
} from "../controllers/reviewsController.js";
import {
  createSchedule,
  deleteSchedule,
  fetchSchedule,
  fetchSchedules,
  scheduleBookings,
  updateSchedule,
} from "../controllers/scheduleController.js";
import {
  createAnalytics,
  fetchAnalytic,
  fetchAnalytics,
  incrementClicks,
  incrementViews,
  updateAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

//auth routes
router.post("/sign-up", Register);
router.post("/sign-in", Login);
router.post("/change-password", ChangePassword);

//user routes
router.put("/change-avatar", updateAvatar);
router.put("/delete-avatar", deleteAvatar);

//property routes
router.post("/create-property", protectRoute, createProperty);
router.get("/fetch-property", fetchProperty);
router.get("/fetch-all-properties", fetchProperties);
router.get("/fetch-available-properties", fetchAvailableProperties);
router.put("/update-property", protectRoute, updateProperty);
router.delete("/delete-property", protectRoute, deleteProperty);

//mail routes
router.post("/create-mail", createMail);
router.get("/fetch-mails", protectRoute, readMails);
router.get("/fetch-mail", protectRoute, readMail);
router.put("/mail-update", protectRoute, emailUpdate);

router.post("/email-schedule-reply", protectRoute, scheduleEmail);

//reply routes
router.post("/reply-to-email", protectRoute, replyToEmail);
router.post("/reply-to-db", protectRoute, createReply);
router.get("/fetch-replies", fetchReplies);
router.get("/fetch-reply", fetchReply);

//review routes
router.post("/create-review", createReview);
router.get("/fetch-reviews", fetchReviews);
router.put("/update-review", updateReview);
router.delete("/delete-review", deleteReview);

//schedule routes
router.post("/create-schedule", createSchedule);
router.get("/fetch-all-schedules", protectRoute, fetchSchedules);
router.get("/fetch-schedule", fetchSchedule);
router.put("/update-schedule", updateSchedule);
router.delete("/delete-schedule", deleteSchedule);
router.get("/schedule-bookings", scheduleBookings);

// analytics route
router.post("/create-analytics", createAnalytics);
router.post("/analytics/clicks/:propertyId", incrementClicks);
router.post("/analytics/views/:propertyId", incrementViews);
router.get("/fetch-analytics", fetchAnalytics);
router.get("/fetch-analytic", fetchAnalytic);
router.put("/update-analytic", updateAnalytics);

//activities route
router.get("/fetch-activities", protectRoute, fetchActivities);

export { router as Router };
