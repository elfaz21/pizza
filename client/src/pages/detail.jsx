import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/Context";
import axios from "axios";
import pizza1 from "../assets/piz1.svg";
import pizza2 from "../assets/piz2.svg";
import pizza3 from "../assets/piz3.svg";
import Navbar from "../components/navbar";
import orderIcon from "../assets/orderIcon.svg";
import Modal from "../components/successOrFailModal";

const PizzaPage = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toppings, setToppings] = useState({});
  const { userId } = useContext(MyContext);
  const [customerPhoneNo, setCustomerPhoneNo] = useState("");
  const [relatedPizzas, setRelatedPizzas] = useState([]);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(
          `https://pizza-server-30q1.onrender.com/api/menu/${id}`
        );
        setPizza(response.data);
        const initialToppings = {};
        response.data.toppings.forEach((topping) => {
          initialToppings[topping] = false;
        });
        setToppings(initialToppings);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCustomerPhoneNo = async () => {
      try {
        const response = await axios.get(
          `https://pizza-server-30q1.onrender.com/api/clients/${userId}`
        );
        const clientData = response.data;
        setCustomerPhoneNo(clientData.phoneNo);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchPizza();
    fetchCustomerPhoneNo();
  }, [id, userId]);

  useEffect(() => {
    const fetchRelatedPizzas = async () => {
      try {
        const response = await fetch(
          "https://pizza-server-30q1.onrender.com/api/menu"
        );
        const data = await response.json();
        const relatedPizzas = data.filter(
          (pizza) => !pizza.toppings.includes("Mozzarella")
        );
        setRelatedPizzas(relatedPizzas);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchRelatedPizzas();
  }, []);

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
      pizzaPhoto: pizza.pizzaPhoto || pizza1,
      userId: userId,
      restaurantId: pizza.userId,
      status: "preparing",
      customerPhoneNo: customerPhoneNo,
      createdAt: new Date().toISOString(),
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        "https://pizza-server-30q1.onrender.com/api/orders",
        orderData
      );
      setOrderSuccessMessage("Your order has been placed successfully.");
      setModalVisible(true);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setOrderSuccessMessage("");
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-orange-100 to-white">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-20">
        {/* Left Side: Pizza Images */}
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={pizza?.image || pizza1}
            alt="Pizza"
            className="w-full rounded-lg md:w-1/2"
          />
          <div className="flex flex-col mt-10 gap-6 md:mt-10 hidden md:block">
            <img
              src={pizza2}
              alt="Pizza 2"
              className="w-full rounded-lg mb-8"
            />
            <img src={pizza3} alt="Pizza 3" className="w-full rounded-lg" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center flex-1 mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex-1 mt-10 md:mt-24 pl-4 md:pl-24">
            <h2 className="font-bold text-gray-800 text-4xl leading-tight">
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
                <span className="text-xl font-semibold text-black-600">
                  Birr
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="mt-6 flex items-center justify-between bg-orange-500 text-white rounded-lg px-10 py-4 hover:bg-orange-600 transition w-full max-w-md"
              >
                Order
                <img src={orderIcon} alt="" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="relative px-4 md:px-10"
        style={{
          backgroundImage: "linear-gradient(#FFDFBD0E, #FFE3C7FF, #FFE4C75E)",
        }}
      >
        <h1
          className="text-2xl font-semi-bold text-left mt-14"
          style={{
            fontSize: "2.5rem",
            color: "#00000080",
            margin: "50px 50px",
            fontWeight: "bold",
          }}
        >
          Related
        </h1>
        <div
          className="flex overflow-x-auto mt-14 z-50 "
          style={{
            padding: "20px 0",
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
            paddingLeft: window.innerWidth >= 1024 ? "20px" : "0",
          }}
        >
          {relatedPizzas.map((pizza, index) => (
            <div
              key={index}
              className="card bg-white shadow-md rounded-md flex flex-col justify-center items-center "
              style={{
                width: window.innerWidth < 768 ? "300px" : "400px",
                flex: "0 0 auto",
                position: "relative",
                margin: "0 10px",
                borderRadius: "25px",
              }}
            >
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  backgroundColor: "#FF8000B4",
                  position: "absolute",
                  top: "16px",
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
                  marginBottom: "30px", 
                  zIndex: 1, 
                }}
              />
              <div className=" mt-8 px-8">
                <h1
                  className="text-base font-bold mb-1 text-center"
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {pizza.name}
                </h1>
                <p className="text-sm text-gray-600 mb-5 text-left">
                  {pizza.toppings.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalVisible && (
        <Modal message={orderSuccessMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default PizzaPage;
