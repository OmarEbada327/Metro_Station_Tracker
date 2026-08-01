const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); 
    }
}