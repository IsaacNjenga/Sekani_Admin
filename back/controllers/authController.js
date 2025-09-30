import UserModel from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const Register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User under this email already exists" });
    }
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "User under this username already exists" });
    }

    //random avatar generation logic
    const avatar = `https://api.dicebear.com/7.x/avataaars/png?seed=${username}`;

    const newUser = new UserModel({ ...req.body, avatar });
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        id: newUser._id,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in Registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email address is invalid" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is invalid" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ChangePassword = async (req, res) => {};

export { Register, Login, ChangePassword };
