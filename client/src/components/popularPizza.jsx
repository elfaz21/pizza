import React from "react";
import pizzaImage2 from "../assets/piza2.svg";
import restaurantProfile from "../assets/restourantProfile.svg";

const PopularPizza = () => {
  const gradientBackground = {
    backgroundImage: "linear-gradient( #FFFFFF, #FFE3C7FF, #FFF8F123)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "10px",
    position: "relative",
    overflow: "hidden",
  };

  const pizzas = [
    {
      name: "Margherita Pizza",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "$150",
      image: pizzaImage2,
      restaurant: "Pizza Palace",
    },
    {
      name: "Margherita Pizza",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "$150",
      image: pizzaImage2,
      restaurant: "Pizza Palace",
    },
    {
      name: "Margherita Pizza",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "$150",
      image: pizzaImage2,
      restaurant: "Pizza Palace",
    },
    {
      name: "Margherita Pizza",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "$150",
      image: pizzaImage2,
      restaurant: "Pizza Palace",
    },
    {
      name: "Margherita Pizza",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "$150",
      image: pizzaImage2,
      restaurant: "Pizza Palace",
    },
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
        style={{ fontSize: "50px", color: "#00000080", margin: "50px 150px" }}
      >
        Popular Pizza
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5 mt-14 "
        style={{
          margin: "50px 150px",
        }}
      >
        {pizzas.map((pizza, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md flex flex-col justify-center items-center"
            style={{
              maxWidth: "400px",
              maxHeight: "900px",
              borderRadius: "25px",
            }}
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="object-cover rounded-full mb-2"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                fontSize: "50px",
                marginTop: "10px",
                backgroundColor: "#FF8100",
              }}
            />
            <div className="text-left mt-5">
              <h1
                className="text-base font-bold mb-1"
                style={{
                  fontSize: "25px",
                }}
              >
                {pizza.name}
              </h1>
              <p className="text-sm text-gray-600">{pizza.ingredients}</p>
              <div className="flex items-center justify-between mt-2">
                <h1
                  className="font-bold mr-2"
                  style={{
                    color: "#01C550",
                    fontSize: "45px",
                  }}
                >
                  {pizza.price}
                </h1>
                <button
                  className="text-white"
                  style={{
                    padding: "10px 40px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    backgroundColor: "#FF8100",
                  }}
                >
                  Order
                </button>
              </div>
            </div>
            <hr className="mt-3 w-full" />
            <div className="flex items-center px-10 my-4 justify-between w-full">
              <img
                src={restaurantProfile}
                alt="Restaurant Profile"
                className="w-14 h-14 object-cover rounded-full mr-1"
              />
              <h2
                className="text-xs font-bold"
                style={{
                  fontSize: "20px",
                }}
              >
                {pizza.restaurant}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPizza;
