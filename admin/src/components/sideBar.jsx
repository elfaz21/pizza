import React, { useContext, useState } from "react";
import { MyContext } from "../context/Context";
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
  const { setTitle, role } = useContext(MyContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = (title) => {
    setTitle(title);
  };

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      } sidebar`}
    >
      <div className="p-4 flex items-center justify-between z-[1000]">
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
        {role === "SuperAdmin" && (
          <>
            <NavLink
              to="/"
              onClick={() => handleLinkClick("Orders")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaClipboardList className="w-6 h-6 mr-2" />
              <span className={isCollapsed ? "hidden" : ""}>Orders</span>
            </NavLink>
            <NavLink
              to="/add-menu"
              onClick={() => handleLinkClick("Add Menu")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaPlus className="w-6 h-6 mr-2" />
              <span className={isCollapsed ? "hidden" : ""}>Add Menu</span>
            </NavLink>
            <NavLink
              to="/add-role"
              onClick={() => handleLinkClick("Role")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaUserShield className="w-6 h-6 mr-2" />
              <span className={isCollapsed ? "hidden" : ""}>Role</span>
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => handleLinkClick("User")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaUsers className="w-6 h-6 mr-2" />
              <span className={isCollapsed ? "hidden" : ""}>User</span>
            </NavLink>
          </>
        )}

        {role !== "SuperAdmin" && (
          <>
            <NavLink
              to="/"
              onClick={() => handleLinkClick("Orders")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaClipboardList className="w-6 h-6 mr-2" />
              <span className={isCollapsed ? "hidden" : ""}>Orders</span>
            </NavLink>
            <NavLink
              to="/add-menu"
              onClick={() => handleLinkClick("Add Menu")}
              className={({ isActive }) =>
                `p-4 hover:bg-orange-100 flex items-center ${
                  isActive ? "text-orange-500 bg-orange-200" : ""
                }`
              }
            >
              <FaPlus className="w-6 h-6 mr-2" />
              <span className={isCollapsed ? "hidden" : ""}>Add Menu</span>
            </NavLink>
          </>
        )}
      </div>

      <NavLink
        to="/login"
        onClick={() => handleLinkClick("Logout")}
        className={`mt-auto p-4 border-t border-gray-300 hover:bg-orange-100 flex items-center ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        <FaSignOutAlt className="w-6 h-6 mr-2" />
        <span className={isCollapsed ? "hidden" : ""}>Logout</span>
      </NavLink>

      <div
        className={`flex flex-col space-y-2 ${isCollapsed ? "w-16" : "hidden"}`}
      >
        <NavLink
          to="/"
          onClick={() => handleLinkClick("Orders")}
          className="flex items-center p-4"
        >
          <FaClipboardList className="w-6 h-6" />
        </NavLink>
        <NavLink
          to="/add-menu"
          onClick={() => handleLinkClick("Add Menu")}
          className="flex items-center p-4"
        >
          <FaPlus className="w-6 h-6" />
        </NavLink>
        {role === "SuperAdmin" && (
          <>
            <NavLink
              to="/add-role"
              onClick={() => handleLinkClick("Role")}
              className="flex items-center p-4"
            >
              <FaUserShield className="w-6 h-6" />
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => handleLinkClick("User")}
              className="flex items-center p-4"
            >
              <FaUsers className="w-6 h-6" />
            </NavLink>
          </>
        )}
        <NavLink
          to="/login"
          onClick={() => handleLinkClick("Logout")}
          className="flex items-center p-4"
        >
          <FaSignOutAlt className="w-6 h-6" />
        </NavLink>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .sidebar {
              display: none; /* Hide the sidebar completely on mobile */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
