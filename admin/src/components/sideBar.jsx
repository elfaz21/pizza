import React, { useState } from "react";
import { BiPackage, BiMenu, BiUser, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import logoImage from "../assets/logoImage.svg";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("Orders");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const dashbordStyle = {
    backgroundColor: "#ccc",
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
    <div style={dashbordStyle}>
      <div className="p-4 flex items-center justify-between">
        <span className={`text-2xl font-bold ${isCollapsed ? "hidden" : ""}`}>
          Pizza
        </span>
        <button
          className="text-black focus:outline-none"
          onClick={toggleSidebar}
        >
          <BiMenu />
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
        <Link
          to="orders"
          className={`p-4 hover:bg-orange-100 flex items-center ${
            activeLink === "Orders" ? "text-orange-500 bg-orange-200" : ""
          }`}
          onClick={() => handleSetActiveLink("Orders")}
        >
          <BiPackage className="w-6 h-6 mr-2" />
          {isCollapsed ? null : "Orders"}
        </Link>
        <Link
          to="/add-menu"
          className={`p-4 hover:bg-orange-100 flex items-center ${
            activeLink === "Add Menu" ? "text-orange-500 bg-orange-200" : ""
          }`}
          onClick={() => handleSetActiveLink("Add Menu")}
        >
          <BiMenu className="w-6 h-6 mr-2" />
          {isCollapsed ? null : "Add Menu"}
        </Link>
        <Link
          to="role"
          className={`p-4 hover:bg-orange-100 flex items-center ${
            activeLink === "Role User" ? "text-orange-500 bg-orange-200" : ""
          }`}
          onClick={() => handleSetActiveLink("Role User")}
        >
          <BiUser className="w-6 h-6 mr-2" />
          {isCollapsed ? null : "Role User"}
        </Link>
        <Link
          to="user"
          className={`p-4 hover:bg-orange-100 flex items-center ${
            activeLink === "user" ? "text-orange-500 bg-orange-200" : ""
          }`}
          onClick={() => handleSetActiveLink("user")}
        >
          <BiUser className="w-6 h-6 mr-2" />
          {isCollapsed ? null : "User"}
        </Link>
      </div>

      <Link
        to="/logout"
        className={`mt-auto p-4 border-t border-gray-300 hover:bg-orange-100 flex items-center ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <BiLogOut className="w-6 h-6 mr-2" />
        {isCollapsed ? null : "Logout"}
      </Link>
    </div>
  );
};

export default Sidebar;
