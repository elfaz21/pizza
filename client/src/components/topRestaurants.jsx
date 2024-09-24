import React from "react";
import restaurantProfile from "../assets/restourantProfile.svg"; // Import your restaurant profile image

const TopRestorant = () => {
  const gradientBackground = {
    backgroundImage: "linear-gradient(#FFFFFF, #FBE4CDFF, #FFF8F143)",
    height: "100%",
    backgroundSize: "100% 100%",
    overflow: "hidden", // Hide vertical scrollbar
  };

  const cardStyle = {
    flex: "0 0 auto",
    marginRight: "10px",
    borderRadius: "15px",
    minWidth: "150px",
  };

  return (
    <div className="relative mt-24 p-5" style={gradientBackground}>
      <h1
        className="text-2xl font-semi-bold text-left mt-14 ml-14"
        style={{ fontSize: "50px", color: "#00000080" }}
      >
        Top Restaurants
      </h1>
      <div
        className="flex p-4 mt-4 items-center"
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        {[1, 2, 3].map((item) => (
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
                  src={restaurantProfile}
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
