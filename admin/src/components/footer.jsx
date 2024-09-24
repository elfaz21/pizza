import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="text-white py-8" style={{ background: "#CCB691" }}>
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full flex gap-10 sm:w-1/2 lg:w-1/4 text-center md:text-left text-black">
            <Link
              to="/"
              className="text-xl font-bold mb-4 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              to="/order"
              className="text-xl font-bold mb-4 hover:text-orange-500"
            >
              Order
            </Link>
            <Link
              to="/about"
              className="text-xl font-bold mb-4 hover:text-orange-500"
            >
              About Us
            </Link>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center justify-center">
            <img src={logo} className="w-24 mb-4" alt="Logo" />
            <div className="relative">
              <input
                type="text"
                placeholder="Your Feedback"
                className="bg-white text-black py-2 px-3 rounded focus:outline-none"
              />
              <button className="text-orange-500 py-2 px-3 rounded absolute right-0 top-1/2 transform -translate-y-1/2">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-black text-white py-10">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <p>@2024 Pizza All Rights Reserved. Terms & Conditions</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-white">
              <FaFacebook />
            </a>
            <a href="#" className="text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
