import cloudinary from "../config/cloudinary.js";
import UserModel from "../models/User.js";

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAvatar = async (req, res) => {
  const { image } = req.body;
  try {
    //delete previous avatar from cloudinary
    if (UserModel.avatar && UserModel.avatar.includes("cloudinary")) {
      try {
        const publicId = UserModel.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error in deleting from cloudinary:", error);
      }
    }

    //upload new avatar
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageURL = uploadResponse.secure_url;

    //update user avatar in db
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { avatar: imageURL },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error in updating user avatar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { updateUser, updateAvatar };
