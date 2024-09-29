const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoute");
// const bookRoutes = require("./routes/bookRoute");
const menuRoute = require("./routes/menuRoute");
const clientUser = require("./routes/clientUserRoute");

const orderRoute = require("./routes/ordersRoute");
const roleRoute = require("./routes/roleRoute");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", clientUser);
app.use("/api", menuRoute);
app.use("/api", roleRoute);
app.use("/api", orderRoute);

// Connect to MongoDB using the environment variable
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server on the specified port or default to 7000
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
