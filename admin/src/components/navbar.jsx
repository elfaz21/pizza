import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import {
  FaBell,
  FaUser,
  FaClipboardList,
  FaPlus,
  FaUserShield,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { MyContext } from "../context/Context";
import axios from "axios";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { userId, role, title } = useContext(MyContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pizza-server-30q1.onrender.com/api/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleLinkClick = (link) => {
    console.log(`${link} clicked`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white h-20 flex items-center relative z-50">
      <div className="px-4 lg:px-10 flex justify-between items-center w-full">
        <div className="flex items-center h-full">
          <h1 className="ml-0 lg:ml-4 font-bold text-lg hover:text-orange-500 active:text-orange-500 flex items-center h-full">
            {title}
          </h1>
        </div>

        <button
          id="menu-toggle"
          onClick={toggleMenu}
          className="lg:hidden text-black focus:outline-none ml-auto"
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

        <div className="hidden lg:flex items-center">
          <p className="text-green-500 truncate mr-10">{role}</p>
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white rounded-lg shadow-lg lg:hidden transition-transform transform translate-y-0 duration-300">
          <div className="flex flex-col items-start py-4 px-6">
            <NavLink
              to="/"
              onClick={() => handleLinkClick("Orders")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center rounded-md transition-colors duration-200 ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaClipboardList className="w-6 h-6 mr-2" />
              <span>Orders</span>
            </NavLink>
            <NavLink
              to="/add-menu"
              onClick={() => handleLinkClick("Add Menu")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center rounded-md transition-colors duration-200 ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaPlus className="w-6 h-6 mr-2" />
              <span>Add Menu</span>
            </NavLink>
            <NavLink
              to="/add-role"
              onClick={() => handleLinkClick("Role")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center rounded-md transition-colors duration-200 ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaUserShield className="w-6 h-6 mr-2" />
              <span>Role</span>
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => handleLinkClick("User")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center rounded-md transition-colors duration-200 ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaUsers className="w-6 h-6 mr-2" />
              <span>User</span>
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => handleLinkClick("Logout")}
              className={`mt-auto p-4 border-t border-gray-300 hover:bg-orange-100 flex items-center rounded-md transition-colors duration-200`}
            >
              <FaSignOutAlt className="w-6 h-6 mr-2" />
              <span>Logout</span>
            </NavLink>
          </div>
        </div>
      )}

      <Outlet />
    </nav>
  );
}

export default Navbar;
