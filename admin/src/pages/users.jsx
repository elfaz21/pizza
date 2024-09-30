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
} from "@mui/material";
import { FaTrash, FaEdit } from "react-icons/fa"; // Importing trash and edit icons
import Sidebar from "../components/sideBar";
import Navbar from "../components/navbar";
import axios from "axios"; // Import axios for API calls

const Users = () => {
  const [data, setData] = useState([]); // Users data
  const [roles, setRoles] = useState([]); // Dynamic roles from API
  const [open, setOpen] = useState(false); // State for modal visibility
  const [editOpen, setEditOpen] = useState(false); // State for edit modal visibility
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNo: "",
    location: "",
    role: "",
    password: "", // Password field
  });
  const [message, setMessage] = useState(""); // State for messages
  const [editingUserId, setEditingUserId] = useState(null); // Track which user is being edited
  const { userId } = useContext(MyContext); // Extract userId from context

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://pizza-server-30q1.onrender.com/api/users"
        );
        const usersWithId = response.data
          .filter((user) => user.restaurantId === userId) // Filter by restaurantId
          .filter((user) => user.role !== "Super Admin") // Exclude super admins
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
          .filter((role) => role.restaurantId === userId) // Filter roles by restaurantId
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
    fetchRoles(); // Fetch roles on mount
  }, [userId]); // Add userId as a dependency

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
          password, // Include the password
          restaurantId: userId, // Use userId from context as restaurantId
          isActive: true,
        }
      );

      const newUserWithId = {
        id: response.data.user._id,
        ...newUser,
        isActive: true,
      };

      setData((prevData) => [...prevData, newUserWithId]);
      setOpen(false); // Close modal
      setNewUser({
        name: "",
        email: "",
        phoneNo: "",
        location: "",
        role: "",
        password: "",
      }); // Reset form
      setMessage(""); // Clear message
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while adding the user."
      );
    }
  };

  const handleEditUser = (user) => {
    setNewUser(user); // Set user data for editing
    setEditingUserId(user.id); // Set the ID for the user being edited
    setEditOpen(true); // Open edit modal
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
      setEditOpen(false); // Close edit modal
      setNewUser({
        name: "",
        email: "",
        phoneNo: "",
        location: "",
        role: "",
        password: "",
      }); // Reset form
      setMessage(""); // Clear message
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
                  event.stopPropagation(); // Prevent row selection
                  handleToggleActive(params.row.id);
                }}
                color={params.row.isActive ? "success" : "error"}
              />
            }
            label=""
          />
          <FaEdit
            style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
            onClick={() => handleEditUser(params.row)} // Open edit modal
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
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#f0f0f0" }}>
      <Sidebar />
      <Navbar />
      <Paper
        elevation={3}
        className="p-4"
        style={{ margin: "50px auto", marginLeft: "420px", width: "70%" }}
      >
        <Typography variant="h4" gutterBottom>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF8100",
              "&:hover": { backgroundColor: "#e07b00" },
            }}
            onClick={() => setOpen(true)} // Open modal
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
        />
      </Paper>

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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
          />
          <TextField
            margin="dense"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password" // Make it a password field
            fullWidth
            variant="outlined"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
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
              sx={{
                width: "150px",
                marginRight: 2,
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "green" },
              }}
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
                height: "42px",
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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
          />
          <TextField
            margin="dense"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
          />
          <TextField
            margin="dense"
            label="Select Role"
            select
            fullWidth
            variant="outlined"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "green" },
            }}
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
                height: "42px",
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
            background-color: #D8D8D8FF; /* Light red color for header */
            color: #000; /* Text color for header */
          }
        `}
      </style>
    </div>
  );
};

export default Users;
