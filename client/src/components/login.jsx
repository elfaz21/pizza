import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme } from "@mui/material/styles";
import { MyContext } from "../context/Context"; // Import MyContext if it's defined in a separate file
import logo from "../assets/logo.svg";
import logoImage from "../assets/logoImage.svg";
import { z } from "zod"; // Import Zod for validation

const theme = createTheme({
  palette: {
    action: {
      focus: "rgba(0, 0, 0, 0.23)",
    },
  },
});

// Define Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId, setIsLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleLogin = async () => {
    // Validate inputs
    try {
      loginSchema.parse({ email, password }); // Validate using Zod
      const response = await axios.post("http://localhost:8001/api/logins", {
        email,
        password,
      });
      navigate("/");
      setUserId(response.data.id);
      setIsLoggedIn(true);
      console.log("Login successful");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message; // Set error messages by field
        });
        setErrors(fieldErrors);
      } else {
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
            alt="login Image"
            className="mx-auto"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-r-lg shadow-lg p-8">
          <img src={logo} alt="" className="hidden md:block mb-4 mt-64" />
          <h1
            style={{
              fontSize: "2rem",
              color: "#333",
              textAlign: "left",
              marginLeft: "20px",
            }}
          >
            Login
          </h1>
          <form className="rounded px-8 pt-6 pb-8">
            <TextField
              label="Email"
              variant="outlined"
              className="custom-textfield"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined })); // Clear error on change
              }}
              error={!!errors.email} // Show error state
              helperText={errors.email} // Display error message
            />
            <TextField
              label="Password"
              variant="outlined"
              className="custom-textfield"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined })); // Clear error on change
              }}
              error={!!errors.password} // Show error state
              helperText={errors.password} // Display error message
            />
            <FormControlLabel
              control={<Checkbox color="orange" />}
              label="Remember me"
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mb-4 py-6"
              style={{ backgroundColor: "#FF8100", color: "white" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-500">
                Register
              </Link>
            </p>
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

export default LoginComponent;
