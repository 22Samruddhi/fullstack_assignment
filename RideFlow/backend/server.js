

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const driverRoutes = require("./routes/driverRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/drivers", driverRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to RideFlow Backend!");
});

// Test API route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "RideFlow API is working!"
  });
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`RideFlow backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start RideFlow:", error.message);
  }
};

startServer();
