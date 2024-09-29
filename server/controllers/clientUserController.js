const ClientUser = require("../models/clientUserModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await ClientUser.findOne({ email, password });

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

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all required fields." });
  }

  try {
    const user = await ClientUser.create(req.body);
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(401).json({
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
    const users = await ClientUser.find(); // Fetch all users
    res.status(200).json(users); // Send back the users
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters

  try {
    const user = await ClientUser.findById(id); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Send back the user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Other functions (getAllUsers, getUserById, updateUser, deleteUser) remain unchanged...

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};
