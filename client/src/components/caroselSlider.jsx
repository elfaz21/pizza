import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardImage1 from "../assets/cardImage1.svg";
import cardImage2 from "../assets/cardImage2.svg";
import cardImage3 from "../assets/cardImage3.svg";

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
        <button className="w-2 h-2 mx-1 rounded-full bg-gray-400"></button>
      );
    },
  };

  return (
    <div className="bg-gradient-to-b from-white via-[#F3D7BCBE] to-[#FFF8F113] p-5">
      <h2 className="text-5xl font-bold text-gray-500 mb-5 md:text-4xl sm:text-3xl">
        Featured Pizza
      </h2>
      <Slider {...settings}>
        {[cardImage1, cardImage2, cardImage3].map((image, index) => (
          <div key={index}>
            <div
              className={`flex items-center text-white rounded-3xl overflow-hidden mx-10 pl-12 ${
                index === 0
                  ? "bg-gray-800"
                  : index === 1
                  ? "bg-[#50482B]"
                  : "bg-[#296D60]"
              }`}
            >
              <div className="flex-1">
                <div className="lg:flex lg:flex-row lg:justify-between">
                  <div className="lg:w-1/2">
                    <h3 className="text-4xl font-bold mb-4">
                      Make Your First Order and Get
                      <span className="text-[#FF9921]"> 50% Off</span>
                    </h3>
                  </div>
                </div>{" "}
                <div className="lg:flex lg:flex-row lg:justify-between">
                  <div className="lg:w-1/2">
                    <p className="text-sm mb-4">
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without.
                    </p>
                  </div>
                </div>
                <button className="px-10 py-2 bg-[#FF9921] text-white rounded-md">
                  Order Now
                </button>
              </div>

              <img
                src={image}
                alt="Pizza"
                className="h-96 rounded-lg ml-5 hidden md:block"
              />
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
    @media (max-width: 768px) {
   
      img {
        height: 0; 
        width: 0; 
        margin-left: 0; 
      }
   
    }

    @media (max-width: 480px) {
   
      button {
        padding: 6px 15px; 
      }
    }
  `}</style>
    </div>
  );
};

export default FeaturedPizzaCarousel;
