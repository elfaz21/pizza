import React from "react";
import piza from "../assets/piza.svg";
import leaf1 from "../assets/leaf1.svg";
import leaf2 from "../assets/leaf2.svg";
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-[#ffc993] min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-4">
      <img
        src={leaf1}
        alt="Leaf 1"
        className="absolute right-64 top-11 hidden lg:block"
      />
      <img
        src={leaf2}
        alt="Leaf 2"
        className="absolute right-[224px] top-[394px] hidden lg:block"
      />

      <div className="flex flex-col items-center lg:hidden mt-10 relative">
        <img
          src={piza}
          alt="Placeholder"
          className="w-[300px] h-[100px] absolute -z-10"
        />
        <h1 className="text-[60px] font-bold mb-2 bg-gradient-to-r from-[#FF8100] to-[#FFBE71] bg-clip-text text-transparent">
          Order{" "}
          <span className="bg-gradient-to-l from-[#FFC082FF] to-[#FFA230FF] bg-clip-text text-transparent">
            Us
          </span>
        </h1>
        <p className="text-black text-center font-normal text-[18px] w-11/12 mb-5">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without.
        </p>
        <div className="flex items-center max-w-md w-full relative mt-2">
          <input
            type="text"
            placeholder="Search"
            className="p-3 rounded-full border-none w-full text-lg outline-none"
          />
          <button className="bg-[#FF890F] text-white p-3 rounded-full absolute right-0">
            <FaSearch className="text-xl" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start max-w-full lg:ml-36 lg:block hidden">
        <h1 className="text-[150px] font-bold mb-2 bg-gradient-to-r from-[#FF8100] to-[#FFBE71] bg-clip-text text-transparent">
          Order{" "}
          <span className="bg-gradient-to-l from-[#FFC082FF] to-[#FFA230FF] bg-clip-text text-transparent">
            Us
          </span>
        </h1>
        <p className="text-black text-left font-normal text-[25px] lg:w-1/2 mb-5">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without.
        </p>
        <div className="flex items-center max-w-md w-full relative mt-2">
          <input
            type="text"
            placeholder="Search"
            className="p-5 rounded-full border-none w-full text-lg outline-none"
          />
          <button className="bg-[#FF890F] text-white p-4 rounded-full absolute right-0">
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </div>

      <img
        src={piza}
        alt="Placeholder"
        className="max-w-[600px] h-[700px] absolute right-0 top-2 lg:block hidden"
      />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;
