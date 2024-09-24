import React from "react";
import piza from "../assets/piza.svg";
import leaf1 from "../assets/leaf1.svg";
import leaf2 from "../assets/leaf2.svg";
import { FaSearch } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient( #FFFFFF, #ffc993, #fff8f1)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={leaf1}
        alt="Leaf 1"
        style={{
          position: "absolute",
          right: "15%",
          top: "11%",
        }}
      />
      <img
        src={leaf2}
        alt="Leaf 2"
        style={{
          position: "absolute",
          right: "10%",
          top: "60%",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
          maxWidth: "100%",
          marginLeft: "150px",
        }}
      >
        <h1
          style={{
            fontSize: "150px",
            marginBottom: "10px",
            fontWeight: "700",
            background: "linear-gradient(to right, #FF8100, #FFBE71)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Order{" "}
          <span
            style={{
              fontSize: "150px",
              marginBottom: "10px",
              fontWeight: "700",
              background: "linear-gradient(to left, #FFC082FF, #FFA230FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Us
          </span>
        </h1>
        <p
          style={{
            color: "#000",
            textAlign: "left",
            fontWeight: "400",
            fontSize: "25px",
            width: "48%",
            marginBottom: "20px",
          }}
        >
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "40%", // Set the width of the search box container
            position: "relative",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              padding: "20px",
              borderRadius: "80px",
              border: "none",
              width: "100%", // Make the search box fill the container width
              marginRight: "10px",
              fontSize: "1.2em",
              outline: "none",
            }}
          />
          <button
            style={{
              background: "#FF890F",
              color: "#fff",
              padding: "30px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              position: "relative",
              marginLeft: "-75px",
            }}
          >
            <FaSearch
              style={{
                fontSize: "1.5em",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </button>
        </div>
      </div>
      <img
        src={piza}
        alt="Placeholder"
        style={{
          maxWidth: "600px",
          height: "700px",
          position: "absolute",
          right: "0",
          top: "2%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100px",
          background:
            "linear-gradient(to top, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      ></div>
    </div>
  );
};

export default HeroSection;
