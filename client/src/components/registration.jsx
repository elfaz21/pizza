import React, { useState } from "react";
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
import axios from "axios";
import { z } from "zod";

const theme = createTheme({
  palette: {
    action: {
      focus: "rgba(0, 0, 0, 0.23)",
    },
  },
});

// Define Zod validation schema
const clientUserSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
    phoneNo: z.string().min(10, "Phone number must be at least 10 digits long"),
    location: z.string().min(1, "Location is required"),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const RegistrationComponent = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs using Zod
    try {
      clientUserSchema.parse({
        phoneNo,
        email,
        password,
        confirmPassword,
        location,
        termsAccepted,
      });

      const response = await axios.post(
        "https://pizza-server-30q1.onrender.com/api/clients",
        {
          phoneNo,
          email,
          password,
          termsAccepted,
          location,
        }
      );

      setMessage(response.data.message);
      console.log(response.data.message);
      navigate("/login");
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
          <img src={logo} alt="" className="hidden md:block mb-2 mt-24" />
          <form className="rounded px-8 pb-2" onSubmit={handleRegister}>
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

export default RegistrationComponent;
