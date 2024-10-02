import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context/Context";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Box,
  Grid,
} from "@mui/material";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../components/sideBar";
import Navbar from "../components/navbar";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNo: "",
    location: "",
    role: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const { userId } = useContext(MyContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://pizza-server-30q1.onrender.com/api/users"
        );
        const usersWithId = response.data
          .filter((user) => user.restaurantId === userId)
          .filter((user) => user.role !== "Super Admin")
          .map((user) => ({
            id: user._id,
            name: user.name,
            phoneNo: user.phoneNo,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
          }));
        setData(usersWithId);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://pizza-server-30q1.onrender.com/api/role"
        );
        const filteredRoles = response.data
          .filter((role) => role.restaurantId === userId)
          .map((role) => ({
            value: role.roleName,
            label: role.roleName,
          }));

        setRoles(filteredRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, [userId]);

  const handleToggleActive = async (id) => {
    const userToToggle = data.find((user) => user.id === id);
    const updatedUser = { ...userToToggle, isActive: !userToToggle.isActive };

    try {
      await axios.put(
        `https://pizza-server-30q1.onrender.com/api/users/${id}`,
        updatedUser
      );
      setData((prevData) =>
        prevData.map((row) => (row.id === id ? updatedUser : row))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://pizza-server-30q1.onrender.com/api/users/${id}`
      );
      setData((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { name, email, phoneNo, location, role, password } = newUser;

    if (!name || !email || !phoneNo || !location || !role || !password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "https://pizza-server-30q1.onrender.com/api/users",
        {
          name,
          email,
          phoneNo,
          location,
          role,
          password,
          restaurantId: userId,
          isActive: true,
        }
      );

      const newUserWithId = {
        id: response.data.user._id,
        ...newUser,
        isActive: true,
      };

      setData((prevData) => [...prevData, newUserWithId]);
      setOpen(false);
      setNewUser({
        name: "",
        email: "",
        phoneNo: "",
        location: "",
        role: "",
        password: "",
      });
      setMessage("");
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while adding the user."
      );
    }
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setEditingUserId(user.id);
    setEditOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const { name, email, phoneNo, location, role } = newUser;

    if (!name || !email || !phoneNo || !location || !role) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8001/api/users/${editingUserId}`,
        {
          name,
          email,
          phoneNo,
          location,
          role,
        }
      );

      const updatedUser = {
        id: editingUserId,
        ...response.data.user,
      };

      setData((prevData) =>
        prevData.map((row) => (row.id === editingUserId ? updatedUser : row))
      );
      setEditOpen(false);
      setNewUser({
        name: "",
        email: "",
        phoneNo: "",
        location: "",
        role: "",
        password: "",
      });
      setMessage("");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while updating the user."
      );
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "phoneNo", headerName: "Phone No", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Switch
                checked={params.row.isActive}
                onChange={(event) => {
                  event.stopPropagation();
                  handleToggleActive(params.row.id);
                }}
                color={params.row.isActive ? "success" : "error"}
              />
            }
            label=""
          />
          <FaEdit
            style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
            onClick={() => handleEditUser(params.row)}
          />
          <FaTrash
            style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <Sidebar />
      <div className="flex-1 overflow-auto p-4 md:ml-60">
        <Navbar />
        <Paper
          elevation={3}
          className="p-4 mx-auto lg:ml-94"
          style={{
            marginTop: "20px",
            width: "90%",
            maxWidth: "1100px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF8100",
                "&:hover": { backgroundColor: "#e07b00" },
              }}
              onClick={() => setOpen(true)}
            >
              Add User
            </Button>
          </Typography>
          {message && <Typography color="error">{message}</Typography>}
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            headerClassName="light-red-header"
            disableSelectionOnClick
            autoHeight
          />
        </Paper>
      </div>

      {/* Modal for adding user */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { borderRadius: 25, padding: "20px" } }}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={newUser.phoneNo}
            onChange={(e) =>
              setNewUser({ ...newUser, phoneNo: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            value={newUser.location}
            onChange={(e) =>
              setNewUser({ ...newUser, location: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <Box
            display="flex"
            alignItems="center"
            marginTop={2}
            justifyContent="space-between"
          >
            <TextField
              select
              margin="dense"
              label="Select Role"
              variant="outlined"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              sx={{ width: "150px", marginRight: 2 }}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={handleAddUser}
              variant="contained"
              sx={{
                width: "180px",
                backgroundColor: "#FF8100",
                "&:hover": { backgroundColor: "#e07b00" },
              }}
            >
              Add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Modal for editing user */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        PaperProps={{ style: { borderRadius: 25, padding: "20px" } }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={newUser.phoneNo}
            onChange={(e) =>
              setNewUser({ ...newUser, phoneNo: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            variant="outlined"
            value={newUser.location}
            onChange={(e) =>
              setNewUser({ ...newUser, location: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Select Role"
            select
            fullWidth
            variant="outlined"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>
          <Box
            display="flex"
            alignItems="center"
            marginTop={2}
            justifyContent="space-between"
          >
            <Button
              onClick={handleUpdateUser}
              variant="contained"
              sx={{
                width: "180px",
                backgroundColor: "#FF8100",
                "&:hover": { backgroundColor: "#e07b00" },
              }}
            >
              Update
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <style>
        {`
          .light-red-header .MuiDataGrid-colCell {
            background-color: #D8D8D8FF;
            color: #000;
          }
          @media (max-width: 600px) {
            .MuiDataGrid-columnHeader {
              font-size: 0.8rem;
            }
            .MuiDataGrid-cell {
              font-size: 0.7rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Users;
