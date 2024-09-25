const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  treatment: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  scheduledDate: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Booked = mongoose.model("book", bookSchema);

module.exports = Booked;
