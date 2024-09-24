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

const AddAdmin = () => {
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
          <img src={logo} alt="" className="hidden md:block mb-2 mt-2" />
          <form className="rounded px-8 pb-2">
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
              label="Phone Number"
              variant="outlined"
              InputLabelProps={{
                classes: { focused: "custom-focused-label" },
              }}
              className="custom-textfield"
              type="number"
              required
            />
            <TextField
              label="Restaurant Name"
              variant="outlined"
              className="custom-textfield"
              type="text"
              required
            />
            <TextField
              label="Location"
              variant="outlined"
              className="custom-textfield"
              type="text"
              required
            />

            <div className="flex items-center flex-col mb-6">
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
              </div>
            </div>
            <FormControlLabel
              control={<Checkbox color="orange" />}
              label="I accept the terms and conditions"
              className="mb-2"
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
            <p className="mt-2 text-center text-gray-600">
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

export default AddAdmin;
