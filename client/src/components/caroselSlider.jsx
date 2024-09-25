import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardImage1 from "../assets/cardImage1.svg"; // Import your pizza image
import cardImage2 from "../assets/cardImage2.svg"; // Import your pizza image
import cardImage3 from "../assets/cardImage3.svg"; // Import your pizza image

const FeaturedPizzaCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: function (i) {
      return (
        <button
          style={{
            width: "10px",
            height: "10px",
            margin: "0 5px",
            borderRadius: "50%",
            background: "gray",
          }}
        >
          {i + 1}
        </button>
      );
    },
  };

  const carouselItemStyle = {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "60px",
    textAlign: "left",
    borderRadius: "40px",
    margin: "0 50px",
    position: "relative",
    overflow: "hidden",
  };

  const orderButtonStyle = {
    padding: "10px 40px",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "70px",
    background: "#FF9921",
  };

  const imageStyle = {
    position: "absolute",
    top: 0,
    right: "-1px",
    height: "500px",
    borderRadius: "10px 0 0 10px",
  };

  const titleStyle = {
    fontSize: "45px",
    width: "550px",
    fontWeight: "bold",
    marginBottom: "20px",
    marginLeft: "70px",
  };
  const descriptionStyle = {
    fontSize: "14px",
    width: "480px",
    marginBottom: "20px",
    marginLeft: "70px",
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient( #FFFFFF, #F3D7BCBE, #FFF8F113)",
      }}
    >
      <h2
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          marginLeft: "60px",
          marginBottom: "20px",
          color: "#00000080",
        }}
      >
        Featured Pizza
      </h2>
      <Slider {...settings}>
        <div>
          <div
            style={{
              ...carouselItemStyle,

              background: "#2F2F2F",
            }}
          >
            <img src={cardImage1} alt="Pizza" style={{ ...imageStyle }} />
            <div>
              <h3 style={titleStyle}>
                Make Your First Order and Get
                <span style={{ color: "#FF9921" }}> 50% Off</span>
              </h3>
              <p style={descriptionStyle}>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without.
              </p>
              <button style={orderButtonStyle}>Order Now</button>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              ...carouselItemStyle,

              background: "#50482B",
            }}
          >
            <img src={cardImage2} alt="Pizza" style={{ ...imageStyle }} />
            <div>
              <h3 style={titleStyle}>
                Make Your First Order and Get
                <span style={{ color: "#FF9921" }}> 50% Off</span>
              </h3>
              <p style={descriptionStyle}>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without.
              </p>
              <button style={orderButtonStyle}>Order Now</button>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              ...carouselItemStyle,

              background: "#296D60",
            }}
          >
            <img src={cardImage3} alt="Pizza" style={{ ...imageStyle }} />
            <div>
              <h3 style={titleStyle}>
                Make Your First Order and Get
                <span style={{ color: "#FF9921" }}> 50% Off</span>
              </h3>
              <p style={descriptionStyle}>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without.
              </p>
              <button style={orderButtonStyle}>Order Now</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default FeaturedPizzaCarousel;
