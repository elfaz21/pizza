// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MyContext } from "./context/Context";
import RegistrationComponent from "./pages/registration";
import LoginComponent from "./pages/login";
import AddAdmin from "./pages/addAdmin";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/sideBar";
import OrdersPage from "./pages/orders";
import Role from "./pages/addRole";
import Users from "./pages/users";
import AddMenu from "./pages/addMenu";

function App() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <MyContext.Provider
      value={{
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        title,
        setTitle,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/register" element={<RegistrationComponent />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/add-role" element={<Role />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-menu" element={<AddMenu />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
