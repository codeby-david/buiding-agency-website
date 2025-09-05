import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const MONGO_URI =
  "mongodb+srv://admin:42276888@myapp.g20pxzq.mongodb.net/myapp?retryWrites=true&w=majority&appName=myapp";

const resetAdmin = async () => {
  try {
    // connect to DB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    // hash new password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // update or create admin
    const result = await User.updateOne(
      { email: "admin@buildingapp.com" },
      {
        $set: {
          name: "Admin User",
          email: "admin@buildingapp.com",
          password: hashedPassword,
          isAdmin: true,
        },
      },
      { upsert: true } // creates if not exists
    );

    console.log("✅ Admin user reset/created:", result);

    // close DB
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

resetAdmin();
