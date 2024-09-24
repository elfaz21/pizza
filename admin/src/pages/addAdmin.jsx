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
import { AiOutlineCloudUpload } from "react-icons/ai";

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
        <div className="w-1/2 bg-orange-500 rounded-l-lg p-8 hidden md:flex items-center justify-center">
          <img
            src={logoImage}
            alt="Registration Image"
            className="mx-auto"
            style={{ width: "200px", height: "200px" }} // Adjust the width and height here
          />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-r-lg shadow-lg p-8">
          <img src={logo} alt="" className="hidden md:block mb-12 mt-24" />
          <h1
            style={{
              fontSize: "2rem",
              color: "#333",
              textAlign: "left",

              marginLeft: "35px",
            }}
          >
            Add Admin
          </h1>

          <form className="rounded px-8 pb-2 mt-10 mb-12">
            <TextField
              label="Admin Name"
              variant="outlined"
              className="custom-textfield"
              type="email"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              className="custom-textfield"
              type="email"
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              className="custom-textfield"
              type="number"
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

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mb-4 p-10 h-12"
              style={{ backgroundColor: "#FF8100", color: "white" }}
            >
              Continue
            </Button>
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
