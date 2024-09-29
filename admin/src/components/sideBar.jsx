import React, { useState } from "react";
import {
  FaPizzaSlice,
  FaClipboardList,
  FaPlus,
  FaUserShield,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa"; // Updated imports
import { NavLink } from "react-router-dom"; // Change Link to NavLink
import logoImage from "../assets/logoImage.svg";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const dashboardStyle = {
    backgroundColor: "#fff",
    zIndex: 50,
    color: "black",
    height: "100vh",
    width: isCollapsed ? "60px" : "250px",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    transition: "all 0.5s ease-in-out",
  };

  return (
    <div className="z-50" style={dashboardStyle}>
      <div className="p-4 z-50 flex items-center justify-between">
        <span className={`text-2xl font-bold ${isCollapsed ? "hidden" : ""}`}>
          Pizza
        </span>
        <button
          className="text-black focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaPizzaSlice style={{ color: "#FF8100" }} />{" "}
          {/* Changed hamburger icon to a pizza slice icon */}
        </button>
      </div>

      <div className={`p-4 flex justify-center ${isCollapsed ? "hidden" : ""}`}>
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: "50px", height: "50px" }}
        />
      </div>

      <div
        className={`flex flex-col space-y-2 ${isCollapsed ? "collapsed" : ""}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-4 hover:bg-orange-100 flex items-center ${
              isActive ? "text-orange-500 bg-orange-200" : ""
            }`
          }
        >
          <FaClipboardList className="w-6 h-6 mr-2" /> {/* Icon for Orders */}
          {isCollapsed ? null : "Orders"}
        </NavLink>
        <NavLink
          to="/add-menu"
          className={({ isActive }) =>
            `p-4 hover:bg-orange-100 flex items-center ${
              isActive ? "text-orange-500 bg-orange-200" : ""
            }`
          }
        >
          <FaPlus className="w-6 h-6 mr-2" /> {/* Icon for Add Menu */}
          {isCollapsed ? null : "Add Menu"}
        </NavLink>
        <NavLink
          to="/add-role"
          className={({ isActive }) =>
            `p-4 hover:bg-orange-100 flex items-center ${
              isActive ? "text-orange-500 bg-orange-200" : ""
            }`
          }
        >
          <FaUserShield className="w-6 h-6 mr-2" /> {/* Icon for Role */}
          {isCollapsed ? null : "Role"}
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `p-4 hover:bg-orange-100 flex items-center ${
              isActive ? "text-orange-500 bg-orange-200" : ""
            }`
          }
        >
          <FaUsers className="w-6 h-6 mr-2" /> {/* Icon for Users */}
          {isCollapsed ? null : "User"}
        </NavLink>
      </div>

      <NavLink
        to="/login"
        className={`mt-auto p-4 border-t border-gray-300 hover:bg-orange-100 flex items-center ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <FaSignOutAlt className="w-6 h-6 mr-2" /> {/* Icon for Logout */}
        {isCollapsed ? null : "Logout"}
      </NavLink>
    </div>
  );
};

export default Sidebar;
