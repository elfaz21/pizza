import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pizzaImage2 from "../assets/piz1.svg";
import restaurantProfile from "../assets/restourantProfile.svg";

const PopularPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  const gradientBackground = {
    backgroundImage: "linear-gradient(#FFDFBD0E, #FFE3C7FF, #FFF0E023)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "10px",
    position: "relative",
    overflow: "hidden",
  };

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch(
          "https://pizza-server-30q1.onrender.com/api/menu"
        );
        const data = await response.json();
        setPizzas(data);
        console.log("Fetched pizzas:", data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="relative mt-24 px-14" style={gradientBackground}>
      <h1
        className="text-2xl font-semi-bold text-left mt-14"
        style={{
          fontSize: "2.5rem",
          color: "#00000080",
          margin: "50px 50px",
          fontWeight: "bold",
        }}
      >
        Popular Pizza
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-14"
          style={{
            margin: "0 15px",
          }}
        >
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md flex flex-col justify-between"
              style={{
                width: "100%",
                maxWidth: "380px",
                margin: "20px auto",
                borderRadius: "25px",
                height: "500px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  backgroundColor: "#FF8000B4",
                  position: "absolute",
                  top: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              />
              <img
                src={pizza.pizzaPhoto || pizzaImage2}
                alt={pizza.name}
                className="object-cover rounded-full mb-2"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  backgroundColor: "#FF8100",
                  margin: "0 auto",
                  marginTop: "30px",
                  zIndex: 1,
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
              <div className="flex items-center justify-between px-8">
                <div className="flex items-center">
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
      )}
    </div>
  );
};

export default PopularPizza;
