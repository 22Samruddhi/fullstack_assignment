
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
      match: [
        /^[A-Za-z ]+$/,
        "Name must contain only letters and spaces"
      ]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^[0-9]{10}$/,
        "Phone number must contain exactly 10 digits"
      ]
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
      validate: {
        validator: function (value) {
          return value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address"
      }
    },

    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true
    },

    status: {
      type: String,
      enum: {
        values: ["Available", "On Ride", "Unavailable"],
        message: "Please select a valid driver status"
      },
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Driver", driverSchema);
