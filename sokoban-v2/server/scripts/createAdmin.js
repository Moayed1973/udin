require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust path as needed
const bcrypt = require("bcryptjs");

// MongoDB Connection Configuration
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sokoban"; // Default to localhost
const PORT = process.env.MONGO_PORT || 27017; // Default MongoDB port

const createAdmin = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);

    // 2. Check if admin already exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("⚠️ Admin user already exists:", adminExists.username);
      return;
    }

    // 3. Create new admin
    const admin = new User({
      username: "admin",
      password: "TemporaryAdminPassword123", // Will be auto-hashed by your pre-save hook
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: TemporaryAdminPassword123"); // Warn to change this later!
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    // 4. Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Run the script
createAdmin();
