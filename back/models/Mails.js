import mongoose from "mongoose";

const mailSchema = new mongoose.Schema(
  {
    email_address: { type: String, required: true },
    full_name: { type: String, required: true },
    read: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
    message: { type: String, required: true },
  },
  { collection: "mail", timestamps: true }
);

const MailsModel = mongoose.model("mail", mailSchema);
export default MailsModel;
