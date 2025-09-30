import express from "express";
import { ChangePassword, Login, Register } from "../controllers/authController";
const router = express.Router();

//auth routes
router.post("/sign-up", Register);
router.post("/sign-in", Login);
router.post("/change-password", ChangePassword);

export { router as Router };
