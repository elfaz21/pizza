import React from "react";
import pizzaImage2 from "../assets/piz1.svg";
import Navbar from "../components/navbar";

const Orders = () => {
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

  const getStatusColor = (status) => {
    if (status === "Received") {
      return "#01C550"; // Green color for Received
    } else if (status === "Ordered") {
      return "#FF8100"; // Orange color for Ordered
    }
    return "#000"; // Default color
  };

  const pizzas = [
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Received",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Ordered",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Received",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Ordered",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Received",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Ordered",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Received",
    },
    {
      name: "Margherita",
      ingredients: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: "150",
      currency: "Birr",
      image: pizzaImage2,
      status: "Ordered",
    },
    // Add more pizza objects here for additional cards
  ];

  return (
    <div className="relative px-14" style={gradientBackground}>
      <Navbar />
      <h1
        className="text-2xl font-semi-bold text-left m-10"
        style={{
          fontSize: "2.5rem",
          color: "#00000080",
          margin: "50px 20px",
          fontWeight: "bold",
        }}
      >
        Order History
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-14"
        style={{
          margin: "0 15px",
        }}
      >
        {pizzas.map((pizza, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md flex flex-col justify-center items-center p-4"
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "10px auto",
              borderRadius: "25px",
            }}
          >
            <img
              src={pizza.image}
              alt={pizza.name}
              className="object-cover rounded-full mb-2"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
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
                <div className="flex">
                  <h1
                    className="font-bold mr-2"
                    style={{
                      color: "#01C550",
                      fontSize: "45px",
                    }}
                  >
                    {pizza.price}
                  </h1>
                  <p className="mt-2">{pizza.currency}</p>
                </div>

                <h1
                  className="text-white"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: getStatusColor(pizza.status), // Change color based on status
                  }}
                >
                  {pizza.status}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
