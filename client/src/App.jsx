// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyContext } from "./context/Context";
import Home from "./pages/home";
import RegistrationComponent from "./components/registration";
import LoginComponent from "./components/login";
import PizzaPage from "./pages/detail";
import Orders from "./pages/orders";

function App() {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <MyContext.Provider
      value={{
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/:id" element={<PizzaPage />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
