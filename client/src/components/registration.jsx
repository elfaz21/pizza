import React from "react";
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
import { Link } from "react-router-dom";

// Custom theme with focus color set to gray
const theme = createTheme({
  palette: {
    action: {
      focus: "rgba(0, 0, 0, 0.23)", // Gray color for focus
    },
  },
});

const RegistrationComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-screen flex">
        <div
          className="w-1/2 rounded-l-lg p-8 hidden md:flex items-center justify-center"
          style={{ background: "#FF9921" }}
        >
          <img
            src={logoImage}
            alt="Registration Image"
            className="mx-auto"
            style={{ width: "200px", height: "200px" }} // Adjust the width and height here
          />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-r-lg shadow-lg p-8">
          <img src={logo} alt="" className="hidden md:block mb-4 mt-24" />
          <form className="rounded px-8 pt-6 pb-8">
            <TextField
              label="Email"
              variant="outlined"
              className="custom-textfield"
              type="email"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              className="custom-textfield"
              type="password"
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              className="custom-textfield"
              type="password"
              required
            />
            <TextField
              label="Location"
              variant="outlined"
              className="custom-textfield"
              type="text"
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              InputLabelProps={{
                classes: { focused: "custom-focused-label" },
              }}
              className="custom-textfield"
              type="number"
              required
            />
            <FormControlLabel
              control={<Checkbox color="orange" />}
              label="I accept the terms and conditions"
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mb-4"
              style={{ backgroundColor: "#FF8100", color: "white" }}
            >
              Register
            </Button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500">
                Login
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

export default RegistrationComponent;
