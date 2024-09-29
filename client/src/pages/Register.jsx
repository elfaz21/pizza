import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Context";
import axios from "axios";

const UserRegistration = () => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const { setUserId, setIsLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result; // Convert image to base64 string
        setImageUrl(imageUrl); // Set the image URL in the state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailRegex)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "https://don-server-75q6.onrender.com/api/users/",
        {
          name,
          phoneNo,
          email,
          password,
          imageUrl,
        }
      );

      const newUser = response.data.user;
      const userId = newUser._id;

      setUserId(userId);
      setIsLoggedIn(true);
      navigate("/");
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-5"
      style={{ background: "linear-gradient(to left, #040a8b, #e6e6e6)" }}
    >
      <div
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
        style={{ background: "linear-gradient(to right, #040a8b, #e6e6e6)" }}
      >
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          User Registration
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="input-field mt-4 p-2 block w-full rounded-md"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="phoneNo"
          className="input-field mt-4 p-2 block w-full rounded-md"
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field mt-4 p-2 block w-full rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field mt-4 p-2 block w-full rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="file"
          className="input-field mt-4 p-2 block w-full rounded-md"
          onChange={(e) => handleFileUpload(e)}
        />

        <button
          className="w-full bg-gradient-to-r from-blue-100 to-white-500 hover:from-white-500 to-blue-600 text-white font-bold py-2 px-4 rounded mt-6 focus:outline-none focus:shadow-outline transition-all duration-300"
          onClick={handleRegister}
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-white">
            Already have an account
            <Link to="/signIn" className="text-blue-100 p-3">
              Sign In
            </Link>
          </p>
        </div>

        {message && <p className="text-red-500 text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default UserRegistration;
