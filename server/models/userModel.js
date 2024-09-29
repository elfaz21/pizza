const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: false,
  },
  restaurantId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  confirmPassword: {
    type: String,
    required: false,
  },
  restaurantName: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },

  imageUrl: {
    type: String,
    required: false,
  },
  termsAccepted: {
    type: Boolean,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
});

const Admins = mongoose.model("admins", adminUserSchema);

module.exports = Admins;
