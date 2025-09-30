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
const router = express.Router();

//auth routes
router.post("/sign-up", Register);
router.post("/sign-in", Login);
router.post("/change-password", ChangePassword);

//user routes
router.put("/change-avatar", updateAvatar);
router.put("/delete-avatar", deleteAvatar);

//property routes
router.post("/create-property", createProperty);
router.get("/fetch-property", fetchProperty);
router.get("/fetch-all-properties", fetchProperties);
router.put("/update-property", updateProperty);
router.delete("/delete-property", deleteProperty);

export { router as Router };
