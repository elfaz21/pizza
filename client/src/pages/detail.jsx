import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Importing the order icon
import pizza1 from "../assets/piz1.svg"; // Replace with your pizza image paths
import pizza2 from "../assets/piz2.svg";
import pizza3 from "../assets/piz3.svg";

const PizzaPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState({
    onions: false,
    tomatoes: false,
    others: false,
  });

  const handleToppingChange = (event) => {
    setToppings({
      ...toppings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleQuantityChange = (operation) => {
    setQuantity((prev) =>
      operation === "+" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const cardWidth = 400; // Default width for each card
  const mobileCardWidth = 300; // Width for mobile devices

  const pizzas = [
    {
      name: "Margherita Pizza",
      description:
        "A classic pizza topped with fresh tomatoes, mozzarella cheese, and fragrant basil.",
      image: pizza1,
    },
    {
      name: "Pepperoni Pizza",
      description:
        "A popular favorite, loaded with spicy pepperoni slices and gooey mozzarella.",
      image: pizza2,
    },
    {
      name: "BBQ Chicken Pizza",
      description:
        "Savory BBQ chicken, red onions, and cilantro on a base of melted cheese.",
      image: pizza3,
    },
    {
      name: "Vegetarian Pizza",
      description:
        "A colorful medley of fresh vegetables, including bell peppers, onions, and olives.",
      image: pizza1,
    },
    {
      name: "Hawaiian Pizza",
      description:
        "A delicious combination of ham, pineapple, and cheese for a sweet and savory experience.",
      image: pizza2,
    },
    {
      name: "Four Cheese Pizza",
      description:
        "Rich and creamy, topped with mozzarella, cheddar, blue cheese, and goat cheese.",
      image: pizza3,
    },
    // Add more pizza objects here for additional cards
  ];

  return (
    <div
      className="flex flex-col  "
      style={{
        background: "#FFE2C57E",
      }}
    >
      <div className="flex gap-6 px-20">
        {/* Left Side: Pizza Images */}
        <div className="flex gap-10 mt-10">
          <img src={pizza1} alt="Pizza 1" className="w-full rounded-lg " />
          <div className="flex flex-col mt-20 gap-16">
            <img src={pizza2} alt="Pizza 2" className="w-full rounded-lg " />
            <img src={pizza3} alt="Pizza 3" className="w-full rounded-lg" />
          </div>
        </div>

        {/* Right Side: Pizza Details */}
        <div className="flex-1 mt-24 pl-20">
          <h2 className="font-bold text-gray-800" style={{ fontSize: "80px" }}>
            Margherita
          </h2>

          <div className="flex flex-col mt-4">
            <div className="flex mt-2">
              <label className="flex items-center text-gray-600 mr-4">
                <input
                  type="checkbox"
                  name="mozzarella"
                  checked={toppings.mozzarella}
                  onChange={handleToppingChange}
                  className="mr-2 accent-orange-500 "
                />
                Mozzarella
              </label>
              <label className="flex items-center text-gray-600 mr-4">
                <input
                  type="checkbox"
                  name="tomato"
                  checked={toppings.tomato}
                  onChange={handleToppingChange}
                  className="mr-2 accent-orange-500 "
                />
                Tomato
              </label>
              <label className="flex items-center text-gray-600 mr-4">
                <input
                  type="checkbox"
                  name="bellPeppers"
                  checked={toppings.bellPeppers}
                  onChange={handleToppingChange}
                  className="mr-2 accent-orange-500 "
                />
                Bell Peppers
              </label>
            </div>
            <div className="flex mt-2">
              <label className="flex items-center text-gray-600 mr-4">
                <input
                  type="checkbox"
                  name="onions"
                  checked={toppings.onions}
                  onChange={handleToppingChange}
                  className="mr-2 accent-orange-500 "
                />
                Onions
              </label>
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  name="olives"
                  checked={toppings.olives}
                  onChange={handleToppingChange}
                  className="mr-2 accent-orange-500 text-white"
                />
                Olives
              </label>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <button
              onClick={() => handleQuantityChange("-")}
              className="border border-orange-500 text-black rounded-lg px-4 py-2 text-bold hover:bg-orange-600 transition"
            >
              -
            </button>
            <span className="mx-4 text-2xl font-bold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("+")}
              className="border border-orange-500 text-black rounded-lg px-4 py-2 hover:bg-orange-600 transition"
            >
              +
            </button>
            <h1 className=" m-2 font-bold text-3xl text-green-600">
              {150 * quantity}
            </h1>

            <span className="text-1xl font-semibold text-black-600">Birr</span>
          </div>

          <button className="mt-6 flex items-center justify-between bg-orange-500 text-white rounded-lg px-8 py-3 hover:bg-orange-600 transition w-64">
            Order
            <FaShoppingCart className="mr-2" />
          </button>
        </div>
      </div>

      {/* Related Cards Section */}
      <div className="relative">
        <h1
          className="text-2xl font-semi-bold text-left"
          style={{
            fontSize: "50px",
            color: "#00000080",
            margin: "0 94px",
            marginTop: "20px",
          }}
        >
          Related
        </h1>

        <div
          className="flex items-center justify-center overflow-x-auto mt-5  z-50"
          style={{
            padding: "10px 0",
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
            paddingLeft: window.innerWidth >= 1024 ? "64px" : "0", // Add left padding on large screens
          }}
        >
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="card bg-white shadow-md rounded-sm flex flex-col justify-center items-center p-4" // Added padding here
              style={{
                width:
                  window.innerWidth < 768
                    ? mobileCardWidth + "px"
                    : cardWidth + "px", // Responsive width
                flex: "1 1 auto",
                marginLeft: "24px",
                borderRadius: "15px",
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
              <div className="text-center mt-5 px-4">
                {" "}
                {/* Centered text */}
                <h1
                  className="text-base font-bold mb-1"
                  style={{ fontSize: "25px" }}
                >
                  {pizza.name}
                </h1>
                <p className="text-sm text-gray-600">{pizza.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaPage;
