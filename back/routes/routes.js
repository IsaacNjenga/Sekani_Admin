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

export { router as Router };
