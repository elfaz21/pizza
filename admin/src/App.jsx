// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyContext } from "./context/Context";
import RegistrationComponent from "./pages/registration";
import LoginComponent from "./pages/login";
import AddAdmin from "./pages/addAdmin";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/sideBar";
import OrdersPage from "./pages/orders";

function App() {
  return (
    <MyContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegistrationComponent />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
