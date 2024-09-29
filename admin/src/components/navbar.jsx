import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBell, FaUser } from "react-icons/fa";
import { MyContext } from "../context/Context";
import axios from "axios";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { userId } = useContext(MyContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        // Handle error
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <nav className="w-full bg-white z-50 h-20 flex items-center">
      <div className="px-10 flex justify-between items-center w-full">
        <div className="flex items-center h-full">
          <Link
            to="/add-menu"
            className="ml-64 font-bold text-lg hover:text-orange-500 active:text-orange-500 flex items-center h-full"
          >
            Add Menu
          </Link>
        </div>
        <button
          id="menu-toggle"
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul
          className={`font-bold text-base sm:text-lg font-arial flex gap-24 items-center lg:gap-20 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          } lg:flex`}
          style={{ fontSize: "18px" }}
        >
          {/* Other menu items can be added here if needed */}
        </ul>
        <div className="flex items-center">
          <FaBell className="text-xl mr-4 text-black" />
          {user && user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="User Profile"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <FaUser className="text-xl text-black" />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </nav>
  );
}

export default Navbar;
