import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{ background: " #FFE3C700" }}>
      <div className="container mx-auto px-4 lg:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-24" alt="Logo" />
        </Link>
        <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
          <svg
            className="h-6 w-6 text-gray-800"
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
        <ul className={`hidden lg:flex lg:gap-20 items-center`}>
          <li>
            <Link to="/" className="nav-link font-bold hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="nav-link font-bold hover:text-orange-500"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/who-we-are"
              className="nav-link font-bold hover:text-orange-500"
            >
              Who we are
            </Link>
          </li>
        </ul>

        {window.innerWidth > 768 && (
          <Link to="/register">
            <button
              className="text-white"
              style={{
                padding: "10px 40px",
                borderRadius: "4px",
                fontSize: "20px",
                backgroundColor: "#FF8100",
              }}
            >
              Register
            </button>
          </Link>
        )}
      </div>
      {isMenuOpen && (
        <ul className="lg:hidden text-white absolute t-10 z-50 right-5 rounded-lg w-64 h-30 flex flex-col items-center bg-black py-4">
          <li>
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/orders" className="nav-link" onClick={toggleMenu}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/who-we-are" className="nav-link" onClick={toggleMenu}>
              Who we are
            </Link>
          </li>
          <li>
            <Link to="/register" className="btn-register" onClick={toggleMenu}>
              Register
            </Link>
          </li>
        </ul>
      )}
      <Outlet />
    </nav>
  );
}

export default Navbar;
