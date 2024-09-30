import React, { useState } from "react";
import {
  FaPizzaSlice,
  FaClipboardList,
  FaPlus,
  FaUserShield,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logoImage from "../assets/logoImage.svg";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <span className={`text-2xl font-bold ${isCollapsed ? "hidden" : ""}`}>
          Pizza
        </span>
        <button
          className="text-black focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaPizzaSlice style={{ color: "#FF8100" }} />
        </button>
      </div>

      <div className={`p-4 flex justify-center ${isCollapsed ? "hidden" : ""}`}>
        <img src={logoImage} alt="Logo" className="w-12 h-12" />
      </div>

      <div className={`flex flex-col space-y-2 ${isCollapsed ? "hidden" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-4 hover:bg-orange-100 flex items-center ${
              isActive ? "text-orange-500 bg-orange-200" : ""
            }`
          }
        >
          <FaClipboardList className="w-6 h-6 mr-2" />
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
          <FaPlus className="w-6 h-6 mr-2" />
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
          <FaUserShield className="w-6 h-6 mr-2" />
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
          <FaUsers className="w-6 h-6 mr-2" />
          {isCollapsed ? null : "User"}
        </NavLink>
      </div>

      <NavLink
        to="/login"
        className={`mt-auto p-4 border-t border-gray-300 hover:bg-orange-100 flex items-center ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        <FaSignOutAlt className="w-6 h-6 mr-2" />
        {isCollapsed ? null : "Logout"}
      </NavLink>
    </div>
  );
};

export default Sidebar;
