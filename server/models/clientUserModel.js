const mongoose = require("mongoose");

const clientUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const ClientUser = mongoose.model("ClientUser", clientUserSchema);

module.exports = ClientUser;
