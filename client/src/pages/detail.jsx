import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/Context";
import axios from "axios";
import pizza1 from "../assets/piz1.svg";
import pizza2 from "../assets/piz2.svg";
import pizza3 from "../assets/piz3.svg";
import Navbar from "../components/navbar";
import orderIcon from "../assets/orderIcon.svg";

const PizzaPage = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toppings, setToppings] = useState({
    onions: false,
    tomatoes: false,
    others: false,
  });
  const { userId } = useContext(MyContext); // Extract userId from context
  const [customerPhoneNo, setCustomerPhoneNo] = useState("");

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/menu/${id}`
        );
        setPizza(response.data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCustomerPhoneNo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/clients/${userId}`
        );
        const clientData = response.data;
        setCustomerPhoneNo(clientData.phoneNo); // Set the phone number
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchPizza();
    fetchCustomerPhoneNo();
  }, [id, userId]);

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

  const handleOrder = async () => {
    const selectedToppings = Object.keys(toppings).filter(
      (topping) => toppings[topping]
    );

    const orderData = {
      name: pizza.name,
      price: pizza.price * quantity,
      toppings: selectedToppings,
      pizzaPhoto: pizza.pizzaPhoto || pizza1, // Fallback to default image if not available
      userId: userId, // Using userId from context
      restaurantId: pizza.userId, // Assuming restaurantId is the userId of the pizza's owner
      status: "preparing", // Ensure status is set to "preparing"
      customerPhoneNo: customerPhoneNo, // Include phone number in the order
      createdAt: new Date().toISOString(), // Add createdAt timestamp
      quantity: quantity, // Add quantity ordered
    };

    try {
      const response = await axios.post(
        "http://localhost:8001/api/orders",
        orderData
      );
      console.log("Order placed successfully:", response.data);
      // Handle successful order placement (e.g., show a confirmation message)
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const relatedPizzas = [
    {
      name: "Margherita",
      description:
        "A classic pizza topped with fresh tomatoes, mozzarella cheese, and fragrant basil.",
      image: pizza1,
    },
    {
      name: "Pepperoni",
      description:
        "A popular favorite, loaded with spicy pepperoni slices and gooey mozzarella.",
      image: pizza2,
    },
    {
      name: "BBQ Chicken",
      description:
        "Savory BBQ chicken, red onions, and cilantro on a base of melted cheese.",
      image: pizza3,
    },
  ];

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: "linear-gradient(#FFDFBD0E, #FFE3C7FF, #FFF0E023)",
      }}
    >
      <Navbar />
      <div className="flex gap-6 px-20">
        {/* Left Side: Pizza Images */}
        <div className="flex gap-10">
          <img
            src={pizza?.image || pizza1}
            alt="Pizza"
            className="w-full rounded-lg"
          />
          <div className="flex flex-col mt-20 gap-16">
            <img src={pizza2} alt="Pizza 2" className="w-full rounded-lg" />
            <img src={pizza3} alt="Pizza 3" className="w-full rounded-lg" />
          </div>
        </div>

        {/* Right Side: Pizza Details */}
        {loading ? (
          <div className="flex justify-center items-center flex-1 mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex-1 mt-24 pl-24">
            <h2
              className="font-bold text-gray-800"
              style={{ fontSize: "80px" }}
            >
              {pizza.name}
            </h2>

            <div className="flex flex-col mt-4">
              {pizza.toppings && pizza.toppings.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {pizza.toppings.map((topping, index) => (
                    <label
                      key={index}
                      className="flex items-center text-gray-600 mr-4 mb-2"
                    >
                      <input
                        type="checkbox"
                        name={topping}
                        checked={toppings[topping] || false}
                        onChange={handleToppingChange}
                        className="mr-2 accent-orange-500"
                      />
                      {topping}
                    </label>
                  ))}
                </div>
              )}

              <div className="flex items-center mt-6">
                <button
                  onClick={() => handleQuantityChange("-")}
                  className="border border-orange-500 text-black rounded-lg px-4 py-2 hover:bg-orange-600 transition"
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
                <h1 className="m-2 font-bold text-3xl text-green-600">
                  {pizza.price * quantity}
                </h1>
                <span className="text-1xl font-semibold text-black-600">
                  Birr
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="mt-6 flex items-center justify-between bg-orange-500 text-white rounded-lg px-10 py-4 hover:bg-orange-600 transition"
                style={{ width: "420px" }}
              >
                Order
                <img src={orderIcon} alt="" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related Cards Section */}
      <div className="relative">
        <h1
          className="text-2xl font-semi-bold text-left"
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "#00000080",
            margin: "0 94px",
            marginTop: "20px",
          }}
        >
          Related
        </h1>

        <div
          className="flex items-center justify-center overflow-x-auto mt-5 z-50"
          style={{
            padding: "10px 0",
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
            paddingLeft: window.innerWidth >= 1024 ? "64px" : "0",
          }}
        >
          {relatedPizzas.map((pizza, index) => (
            <div
              key={index}
              className="card bg-white shadow-md rounded-sm flex flex-col justify-center items-center p-4"
              style={{
                width: window.innerWidth < 768 ? "300px" : "400px",
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
                  width: "80%",
                  height: "auto",
                  maxWidth: "300px",
                  borderRadius: "50%",
                  marginTop: "10px",
                  backgroundColor: "#FF8100",
                }}
              />
              <div className="text-center mt-5 px-4">
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
