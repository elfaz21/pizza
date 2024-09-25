// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyContext } from "./context/Context";
import Home from "./pages/home";
import RegistrationComponent from "./components/registration";
import LoginComponent from "./components/login";
import PizzaPage from "./pages/detail";

function App() {
  return (
    <MyContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/detail" element={<PizzaPage />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
