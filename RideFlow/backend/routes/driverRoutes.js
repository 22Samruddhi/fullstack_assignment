
const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

// GET: Retrieve all drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch drivers",
      error: error.message
    });
  }
});

// POST: Add a new driver
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, licenseNumber, status } = req.body;

    const driver = await Driver.create({
      name,
      phone,
      email,
      licenseNumber,
      status
    });

    res.status(201).json({
      message: "Driver added successfully!",
      driver
    });
  } catch (error) {
    const statusCode =
      error.code === 11000 ? 409 :
      error.name === "ValidationError" ? 400 : 500;

    res.status(statusCode).json({
      message: "Failed to add driver",
      error: error.message
    });
  }
});

module.exports = router;
