import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-transparent z-50">
      <div className="px-10 lg:px-10 py-2 flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-30" alt="" />
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
          style={{
            fontSize: "18px",
          }}
        >
          <li>
            <Link
              to="/"
              className="hover:text-orange-500 active:text-orange-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="hover:text-orange-500 active:text-orange-500"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/who-we-are"
              className="hover:text-orange-500 active:text-orange-500"
            >
              Who we are
            </Link>
          </li>
        </ul>
        <Link to="/register">
          <button
            style={{
              backgroundColor: "#FF890F",
              color: "#fff",
              fontSize: "16px",
              padding: "8px 25px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Register
          </button>
        </Link>
      </div>
      <Outlet />
    </nav>
  );
}

export default Navbar;
