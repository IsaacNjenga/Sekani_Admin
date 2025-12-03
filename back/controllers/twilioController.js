import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendMessage = async (req, res) => {
  try {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+254740900061",
        body: "Hello from Sekani Admin",
      })
      .then(() => console.log("sent!"));
  } catch (error) {
    console.error("Error sending message:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const appointmentNotification = async (message) => {
  try {
    await client.messages
      .create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+254740900061",
        body: message,
      })
      .then(() => console.log("Appointment notification sent!"));
  } catch (error) {
    console.error("Error sending appointment notification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { sendMessage };
