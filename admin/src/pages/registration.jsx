import React, { useState, useContext, useRef } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import logo from "../assets/logo.svg";
import logoImage from "../assets/logoImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context"; // Import MyContext if it's defined in a separate file
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios"; // Import axios for making API requests
import { z } from "zod"; // Import Zod for validation

const theme = createTheme({
  palette: {
    action: {
      focus: "rgba(0, 0, 0, 0.23)",
    },
  },
});

// Define Zod validation schema
const adminSchema = z.object({
  adminName: z.string().min(1, "Admin name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters long"),
  phoneNo: z.string().min(10, "Phone number must be at least 10 digits long"),
  location: z.string().min(1, "Location is required"),
  restaurantName: z.string().min(1, "Restaurant name is required"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

const AddAdmin = () => {
  const [adminName, setAdminName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("SuperAdmin");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [location, setLocation] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const { setUserId } = useContext(MyContext);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs using Zod
    try {
      adminSchema.parse({
        adminName,
        phoneNo,
        email,
        password,
        confirmPassword,
        location,
        restaurantName,
        termsAccepted,
      });

      const response = await axios.post("http://localhost:8001/api/users", {
        adminName,
        phoneNo,
        email,
        password,
        confirmPassword,
        role,
        termsAccepted,
        imageUrl,
        location,
        restaurantName,
      });

      setMessage(response.data.message);
      console.log(response.data.message);
      navigate("/");
      setUserId(response.data.id);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        setMessage("An error occurred during registration.");
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-screen flex">
        <div className="w-1/2 bg-orange-500 rounded-l-lg p-8 hidden md:flex items-center justify-center">
          <img
            src={logoImage}
            alt="Registration Image"
            className="mx-auto"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-r-lg shadow-lg p-8">
          <img src={logo} alt="" className="hidden md:block mb-2 mt-2" />
          <form className="rounded px-8 pb-2" onSubmit={handleRegister}>
            <TextField
              label="Admin Name"
              variant="outlined"
              className="custom-textfield"
              type="text"
              name="adminName"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              className="custom-textfield"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              className="custom-textfield"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              className="custom-textfield"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              className="custom-textfield"
              type="tel"
              name="phoneNumber"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
            <TextField
              label="Location"
              variant="outlined"
              className="custom-textfield"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <TextField
              label="Restaurant Name"
              variant="outlined"
              className="custom-textfield"
              type="text"
              name="restaurantName"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
            <div
              style={{
                border: "2px dotted #222",
                padding: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => inputRef.current.click()}
            >
              <AiOutlineCloudUpload size={40} color="#FF8100" />
              <span
                style={{
                  color: "#FF8100",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  marginLeft: "5px",
                }}
              >
                Upload Logo
              </span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  color="orange"
                  name="termsAccepted"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label="I accept the terms and conditions"
              className="mb-2"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mb-4"
              style={{ backgroundColor: "#FF8100", color: "white" }}
            >
              Register
            </Button>
            <p className="mt-2 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500">
                Login
              </Link>
            </p>
            {message && <p className="text-center text-red-600">{message}</p>}
          </form>
        </div>
      </div>

      <style>{`
        .custom-textfield {
          margin-bottom: 15px;
          width: 100%;
        }
        .custom-textfield .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: rgba(0, 0, 0, 0.23);
        }
      `}</style>
    </ThemeProvider>
  );
};

export default AddAdmin;
