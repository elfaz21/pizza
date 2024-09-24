import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Sidebar from "../components/sideBar";

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Sidebar />
      <div className="grid grid-cols-2 gap-4">
        <Paper elevation={3} className="p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Sample data for table rows */}
                <TableRow>
                  <TableCell>2022-10-20</TableCell>
                  <TableCell>User logged in</TableCell>
                  <TableCell>Success</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2022-10-19</TableCell>
                  <TableCell>Product added to cart</TableCell>
                  <TableCell>Success</TableCell>
                </TableRow>
                {/* Add more table rows as needed */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper elevation={3} className="p-4">
          <h2 className="text-lg font-semibold mb-2">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded">
              <div>Total Users</div>
              <div className="font-bold text-2xl">150</div>
            </div>
            <div className="p-4 bg-gray-100 rounded">
              <div>Active Users</div>
              <div className="font-bold text-2xl">120</div>
            </div>
            {/* Add more statistics here */}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard;
