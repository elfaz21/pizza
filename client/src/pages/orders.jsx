import React, { useEffect, useState, useContext } from "react";
import pizzaImage2 from "../assets/piz1.svg";
import Navbar from "../components/navbar";
import { MyContext } from "../context/Context"; 
import axios from "axios";

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
    switch (status) {
      case "Received":
        return "#01C550"; 
      case "Ordered":
        return "#FF8100"; 
      case "Preparing":
        return "#FFDF00"; 
      case "Ready":
        return "#FFAA00";
      case "Delivered":
        return "#01C550"; 
      default:
        return "#FF1100FF"; 
    }
  };

  const { userId } = useContext(MyContext); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return; 
      }

      try {
        const response = await axios.get(
          `https://pizza-server-30q1.onrender.com/api/orders/`
        );
        const filteredOrders = response.data.filter(
          (order) => order.userId === userId
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: "linear-gradient(#FFDFBD0E, #FFE3C7FF, #FFF0E023)",
        height: "100vh",
      }}
    >
      <Navbar
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      />

      <div style={{ marginTop: "120px" }}>
        <h1
          className="text-2xl font-semi-bold text-left"
          style={{
            fontSize: "2.5rem",
            color: "#00000080",
            margin: "20px 20px 10px",
            fontWeight: "bold",
          }}
        >
          Order History
        </h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
          </div>
        ) : !userId ? (
          <div className="text-center mt-10 ">
            <h2 className="text-lg font-bold ">Login to Order Our Pizzas</h2>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-lg font-bold">You don't have orders yet</h2>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-14"
            style={{
              margin: "0 15px",
            }}
          >
            {orders.map((pizza, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md flex flex-col justify-center items-center p-4"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  margin: "10px auto",
                  borderRadius: "25px",
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
                    marginTop: "10px",
                    zIndex: 1,
                  }}
                />
                <div className="text-left mt-14">
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
                        color: getStatusColor(pizza.status),
                      }}
                    >
                      {pizza.status}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
