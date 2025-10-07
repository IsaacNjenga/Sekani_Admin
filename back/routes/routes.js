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
  fetchProperties,
  fetchProperty,
  updateProperty,
} from "../controllers/propertiesController.js";

import protectRoute from "../middleware/auth.middleware.js";

import {
  createMail,
  emailRead,
  emailStarred,
  readMail,
  readMails,
} from "../controllers/mailController.js";

import {
  createReply,
  fetchReplies,
  fetchReply,
} from "../controllers/repliesController.js";

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
router.get("/fetch-property", protectRoute, fetchProperty);
router.get("/fetch-all-properties", protectRoute, fetchProperties);
router.put("/update-property", protectRoute, updateProperty);
router.delete("/delete-property", protectRoute, deleteProperty);

//mail routes
router.post("/create-mail", createMail);
router.get("/fetch-mails", protectRoute, readMails);
router.get("/fetch-mail", protectRoute, readMail);
router.put("/mail-read", protectRoute, emailRead);
router.put("/mail-starred", protectRoute, emailStarred);

//reply routes
router.post("/create-reply", protectRoute, createReply);
router.get("/fetch-replies", fetchReplies);
router.get("/fetch-reply", fetchReply);

export { router as Router };
