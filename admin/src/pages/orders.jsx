import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";
import Sidebar from "../components/sideBar";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "topping", headerName: "Topping", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 150 },
  { field: "customerNo", headerName: "Customer No", width: 150 },
  { field: "createdAt", headerName: "Created At", width: 180 },
  { field: "status", headerName: "Status", width: 150 },
];

const rows = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    topping: "Pepperoni",
    quantity: 2,
    customerNo: "12345",
    createdAt: "2024-09-24",
    status: "Delivered",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    topping: "Cheese, Basil",
    quantity: 1,
    customerNo: "54321",
    createdAt: "2024-09-23",
    status: "Preparing",
  },
  // Add more rows as needed
];

const OrdersPage = () => {
  return (
    <div
      style={{
        height: 400,
        width: "80%",
        marginTop: "50px",
        marginLeft: "290px",
      }}
    >
      <Sidebar />
      <Paper elevation={3} className="p-4">
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </Paper>
    </div>
  );
};

export default OrdersPage;
