const express = require("express");
const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     console.log(user);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Login successful");

    // Send the user ID along with the user object in the response
    res.status(200).json({ user, id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 587,
  secure: false,

  secureConnection: false,
  auth: {
    user: "inner2100@gmail.com",
    pass: "Elfaz@444",
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpiration = Date.now() + 3600000; // Token expires in 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetExpiration;
    await user.save();

    const mailOptions = {
      from: "inner2100@gmail.com",
      to: user.email,
      subject: "Password Reset Link",
      html: `Your password reset link: http://localhost:5173/forget-password?token=${resetToken}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        return res
          .status(200)
          .json({ message: "Password reset link sent to your email" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const createUser = async (req, res) => {
  const { email, password, name, imageUrl } = req.body;

  if (!name || !email || !password || !imageUrl) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields." });
  }

  try {
    const user = await User.create(req.body);
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({
        message: "This user already exists. Would you like to login instead?",
      });
    } else {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `No user found with the id ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  forgetPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
