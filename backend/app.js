const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const stationRoutes = require("./routes/stationRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found"});
});

app.use(errorHandler);

module.exports = app;