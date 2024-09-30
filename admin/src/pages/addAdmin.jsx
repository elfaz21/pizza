import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from "@mui/material";
import { MyContext } from "../context/Context";
import Sidebar from "../components/sideBar";
import Navbar from "../components/navbar";
import LoginPage from "./login";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const columns = (handleStatusChange) => [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "topping", headerName: "Topping", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 150 },
  { field: "customerNo", headerName: "Customer No", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const { status } = params.row;

      return (
        <div style={{ margin: "5px 0" }}>
          {status === "Delivered" ? (
            <div
              style={{ color: "green", display: "flex", alignItems: "center" }}
            >
              {status}
              <CheckCircleIcon style={{ marginLeft: 5 }} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
                height: "35px",
                width: "135px",
                borderRadius: "8px",
                margin: "10px 0px",
                backgroundColor: status === "Preparing" ? "orange" : "green",
                color: "white",
                boxShadow: "none",
              }}
            >
              <FormControl variant="outlined" style={{ flex: 1 }}>
                <Select
                  value={status}
                  onChange={(e) => handleStatusChange(e, params.row.id)}
                  style={{ color: "white", border: "none" }}
                >
                  <MenuItem value="Preparing">Preparing</MenuItem>
                  <MenuItem value="Ready">Ready</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </div>
      );
    },
  },
];

const OrdersPage = () => {
  const { userId } = useContext(MyContext);
  const [rows, setRows] = useState([]);
  const [restaurantId2, setRestaurantId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://pizza-server-30q1.onrender.com/api/users/${userId}`
        );
        setRestaurantId(response.data.restaurantId); // Assuming user data contains restaurantId
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://pizza-server-30q1.onrender.com/api/orders/"
        );
        const filteredOrders = response.data
          .filter(
            (order) =>
              order.restaurantId === userId ||
              order.restaurantId === restaurantId2
          )
          .map((order, index) => ({
            id: index + 1,
            name: order.name,
            topping: order.toppings.join(", "),
            quantity: order.quantity,
            customerNo: order.customerPhoneNo,
            createdAt: new Date(order.createdAt).toLocaleString(),
            status:
              order.status.charAt(0).toUpperCase() + order.status.slice(1),
          }));

        setRows(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId, restaurantId2]);

  const handleStatusChange = (e, id) => {
    const { value } = e.target;
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, status: value } : row))
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (!userId) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div
        className={`fixed inset-0 md:hidden transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto p-4 md:ml-60">
        <Navbar />
        <Paper elevation={3} className="p-4 mt-4">
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          <div style={{ height: "400px", width: "100%", overflowX: "auto" }}>
            <DataGrid
              rows={rows}
              columns={columns(handleStatusChange)}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              autoHeight
              style={{
                minWidth: "600px",
              }}
            />
          </div>
        </Paper>

        <IconButton
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#1976d2",
            color: "black",
            borderRadius: "50%",
            zIndex: 50,
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default OrdersPage;
