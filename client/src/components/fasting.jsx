import React from "react";
import pizzaImage2 from "../assets/piza2.svg";
import restaurantProfile from "../assets/restourantProfile.svg";

const Fasting = () => {
  const gradientBackground = {
    backgroundImage: "linear-gradient(#FFFFFF, #FBE4CDFF, #fff8f1)",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  const cardWidth = 400; // Fixed width for each card

  const pizzas = [
    {
      name: "Margherita Pizza",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "$150",
      image: pizzaImage2,
      restaurant: "Pizza Palace",
    },
    // Add more pizza objects here for additional cards
  ];

  return (
    <div className="relative mt-24" style={gradientBackground}>
      <h1
        className="text-2xl font-semi-bold text-left mt-14 ml-14"
        style={{ fontSize: "50px", color: "#00000080", margin: "50px 0" }}
      >
        Fasting
      </h1>

      <div
        className="flex flex-wrap justify-start gap-5 mt-14 overflow-hidden z-50"
        style={{
          marginLeft: "15px", // Adjusted for better alignment
          padding: "20px 0",
        }}
      >
        {pizzas.map((pizza, index) => (
          <div
            key={index}
            className="card bg-white shadow-md rounded-md flex flex-col justify-center items-center"
            style={{
              width: cardWidth + "px",
              flex: "0 0 auto",
              margin: "10px",
              borderRadius: "25px",
              maxWidth: "100%", // Make card responsive
            }}
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="object-cover rounded-full mb-2"
              style={{
                width: "80%", // Responsive image width
                height: "auto", // Maintain aspect ratio
                maxWidth: "300px", // Limit max width
                borderRadius: "50%",
                marginTop: "10px",
                backgroundColor: "#FF8100",
              }}
            />
            <div className="text-left mt-5 px-4">
              {" "}
              {/* Added padding */}
              <h1
                className="text-base font-bold mb-1"
                style={{ fontSize: "25px" }}
              >
                {pizza.name}
              </h1>
              <p className="text-sm text-gray-600">{pizza.ingredients}</p>
              <div className="flex items-center justify-between mt-2">
                <h1
                  className="font-bold"
                  style={{ color: "#01C550", fontSize: "1.5rem" }}
                >
                  {pizza.price}
                </h1>
                <button
                  className="text-white"
                  style={{
                    padding: "10px 20px", // Adjusted for mobile
                    borderRadius: "10px",
                    fontSize: "1rem",
                    backgroundColor: "#FF8100",
                  }}
                >
                  Order
                </button>
              </div>
            </div>
            <hr className="mt-3 w-full" />
            <div className="flex items-center px-10 my-3 justify-between w-full">
              <img
                src={restaurantProfile}
                alt="Restaurant Profile"
                className="w-14 h-14 object-cover rounded-full mr-1"
              />
              <h2 className="text-xs font-bold" style={{ fontSize: "20px" }}>
                {pizza.restaurant}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fasting;
