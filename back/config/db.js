import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const Connection = async () => {
  try {
    const db = process.env.URI;
    await mongoose.connect(db);
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to db", error);
  }
};

Connection();

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// let isConnected = false; // Global connection flag

// export const connectDB = async () => {
//   if (isConnected) {
//     // console.log("🟢 Using existing database connection");
//     return;
//   }

//   try {
//     const db = process.env.URI;
//     const conn = await mongoose.connect(db, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = conn.connections[0].readyState === 1;
//     console.log("✅ Database Connected");
//   } catch (error) {
//     console.error("❌ Database connection error:", error);
//   }
// };
