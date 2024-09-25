import React from "react";
import {
  TextField,
  Button,
  createTheme,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
} from "@mui/material";
import logo from "../assets/logo.svg";
import logoImage from "../assets/logoImage.svg";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    action: {
      focus: "rgba(0, 0, 0, 0.23)",
    },
  },
});

const LoginComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-screen flex">
        <div
          className="w-1/2 rounded-l-lg p-8 hidden md:flex items-center justify-center"
          style={{ background: "#FF9921" }}
        >
          <img
            src={logoImage}
            alt="login Image"
            className="mx-auto"
            style={{ width: "200px", height: "200px" }} // Adjust the width and height here
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
            />
            <TextField
              label="Password"
              variant="outlined"
              className="custom-textfield"
              type="password"
              required
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
              className="mb-4"
              style={{ backgroundColor: "#FF8100", color: "white" }}
            >
              Login
            </Button>
            <p className="mt-4 text-center text-gray-600">
              don't have an account?{" "}
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
