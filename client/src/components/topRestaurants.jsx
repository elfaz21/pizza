import React, { useEffect } from "react";
import bbb from "../assets/bbbb.png";
import restaurantProfile from "../assets/restourantProfile.svg";

const TopRestorant = () => {
  useEffect(() => {
    const container = document.querySelector(".scroll-container");

    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const cardWidth = container.querySelector(".flex").offsetWidth;
      const clonedCards = container.querySelectorAll(".flex").length;

      const cloneCards = () => {
        for (let i = 0; i < clonedCards; i++) {
          const clone = container.children[i].cloneNode(true);
          container.appendChild(clone);
        }
      };

      const scrollStep = 1; // Adjust the scroll step as needed
      let scrollPos = 0;
      let intervalId;

      const scroll = () => {
        scrollPos += scrollStep;
        if (scrollPos >= scrollWidth + cardWidth) {
          scrollPos = 0;
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = scrollPos;
        }
      };

      cloneCards(); // Clone cards for seamless loop
      intervalId = setInterval(scroll, 10); // Auto-scroll every 10ms

      return () => clearInterval(intervalId);
    }
  }, []);

  const cardStyle = {
    flex: "0 0 auto",
    marginRight: "10px",
    borderRadius: "15px",
    minWidth: "150px",
  };

  return (
    <div
      className="relative mt-24 py-5"
      style={{
        backgroundImage: "linear-gradient(#FFDFBD0E, #FFE3C7FF, #FFF0E023)",
      }}
    >
      <h1 className="text-3xl font-semibold text-left mt-14 mx-4 md:text-5xl text-gray-500">
        Top Restaurants
      </h1>
      <div className="flex p-2 mt-4 items-center overflow-x-hidden scrollbar-hidden scroll-container">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex bg-white rounded-lg shadow-md"
            style={cardStyle}
          >
            <div className="p-4">
              <div className="mb-4 flex items-center">
                <img
                  src={restaurantProfile}
                  alt=""
                  className="w-14 h-14 object-cover rounded-full mr-4"
                />
                <h1 className="text-xl font-bold">Azmera Pizza</h1>
              </div>
              <p
                className="text-sm w-64 text-gray-700"
                style={{ fontSize: "15px", fontWeight: "400" }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to...
              </p>
            </div>
            <div
              className="flex justify-between items-center my-10 mx-5 px-5 rounded-lg"
              style={{
                padding: "10px 40px",
                height: "110px",
                width: "380px",
                backgroundColor: "#0080000D",
              }}
            >
              <div
                className="flex justify-center items-center rounded-full"
                style={{
                  height: "80px",
                  width: "80px",
                  backgroundColor: "#FF810033",
                }}
              >
                <img
                  src={bbb}
                  alt=""
                  className="object-cover w-50 h-50 rounded-full"
                />
              </div>
              <div className="flex flex-col items-center justify-center overflow-hidden">
                <p
                  className="text-sm mt-5 text-gray-600"
                  style={{ fontSize: "12px" }}
                >
                  Number of Orders
                </p>
                <h1
                  style={{
                    fontSize: "50px",
                    color: "#FF8100",
                    fontWeight: 700,
                  }}
                >
                  2k
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRestorant;
