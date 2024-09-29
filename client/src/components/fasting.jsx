import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pizzaImage2 from "../assets/piz1.svg";
import restaurantProfile from "../assets/restourantProfile.svg";

const Fasting = () => {
  const [pizzas, setPizzas] = useState([]); // State to hold fetched pizzas
  const [loading, setLoading] = useState(true); // State to manage loading status

  const gradientBackground = {
    backgroundImage: "linear-gradient(#FFFFFF, #FBE4CDFF, #fff8f1)",
    height: "100vh",
    backgroundSize: "100% 100%",
  };

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/menu");
        const data = await response.json();
        // Filter pizzas to exclude those containing "Mozzarella"
        const fastingPizzas = data.filter(
          (pizza) => !pizza.toppings.includes("Mozzarella")
        );
        setPizzas(fastingPizzas);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative mt-24" style={gradientBackground}>
      <h1
        className="text-2xl font-semi-bold text-left mt-14 ml-24"
        style={{
          fontSize: "2.5rem",
          color: "#00000080",
          margin: "50px 50px",
          fontWeight: "bold",
        }}
      >
        Fasting
      </h1>

      <div
        className="flex overflow-x-auto mt-14 z-50"
        style={{
          padding: "20px 0",
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
          paddingLeft: window.innerWidth >= 1024 ? "20px" : "0", // Add left padding on large screens
        }}
      >
        {pizzas.map((pizza, index) => (
          <div
            key={index}
            className="card bg-white shadow-md rounded-md flex flex-col justify-center items-center"
            style={{
              width: window.innerWidth < 768 ? "300px" : "400px", // Responsive width
              flex: "0 0 auto",
              position: "relative",
              margin: "0 10px",
              borderRadius: "25px",
            }}
          >
            <div
              style={{
                width: "250px", // Slightly larger than the image
                height: "250px", // Slightly larger than the image
                borderRadius: "50%",
                backgroundColor: "#FF8000B4", // Orange background
                position: "absolute",
                top: "16px", // Slightly offset from the top
                left: "50%",
                transform: "translateX(-50%)", // Center it horizontally
                zIndex: 1, // Place it behind the image
              }}
            />
            <img
              src={pizza.pizzaPhoto || pizzaImage2} // Fallback image if pizzaPhoto is not available
              alt={pizza.name}
              className="object-cover rounded-full mb-2"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                backgroundColor: "#FF8100",
                margin: "0 auto",
                marginTop: "30px", // Space from the top
                marginBottom: "30px", // Space from the top
                zIndex: 1, // Ensure the image is above the background
              }}
            />
            <div className="text-left mt-8 px-8">
              <h1
                className="text-base font-bold mb-1"
                style={{
                  fontSize: "25px",
                }}
              >
                {pizza.name}
              </h1>
              <p className="text-sm text-gray-600">
                {pizza.toppings.join(", ")}
              </p>
            </div>
            {/* Fixed height for price and button section */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center mx-10">
                <h1
                  className="font-bold mr-2"
                  style={{
                    color: "#01C550",
                    fontSize: "45px",
                  }}
                >
                  {pizza.price}
                </h1>
                <p className="mt-2">Birr</p>
              </div>
              <Link to={`/${pizza._id}`}>
                <button
                  className="text-white"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    backgroundColor: "#FF8100",
                  }}
                >
                  Order
                </button>
              </Link>
            </div>
            <hr className="mt-3 w-full" />
            <div className="flex items-center px-10 mb-5 justify-between w-full">
              <img
                src={pizza.imageUrl}
                alt="Restaurant Profile"
                className="w-14 h-14 object-cover rounded-full mr-1"
              />
              <h2
                className="text-xs font-bold"
                style={{
                  fontSize: "20px",
                }}
              >
                {pizza.restaurantName}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fasting;
