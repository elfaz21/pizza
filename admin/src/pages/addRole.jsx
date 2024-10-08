import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { FaEye, FaTrash } from "react-icons/fa";
import Sidebar from "../components/sideBar";
import Navbar from "../components/navbar";
import axios from "axios";
import { MyContext } from "../context/Context";

const Role = () => {
  const { userId } = useContext(MyContext);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    updateOrderStatus: false,
    deleteUser: false,
    editUser: false,
    seeOrders: false,
    createRoles: false,
    deleteRoles: false,
    addUsers: false,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `https://pizza-server-30q1.onrender.com/api/role`
        );

        const rolesWithId = response.data
          .filter((role) => role.restaurantId === userId)
          .map((role) => ({
            id: role._id,
            RoleName: role.roleName,
            CreatedAt: new Date(role.createdAt).toLocaleDateString(),
            isActive: role.isActive,
          }));

        setData(rolesWithId);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, [userId]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRoleName("");
    setPermissions({
      updateOrderStatus: false,
      seeCustomers: false,
      seeOrders: false,
      createRoles: false,
      addUsers: false,
    });
  };

  const handleToggleActive = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, isActive: !row.isActive } : row
      )
    );
  };

  const handleView = (id) => {
    console.log("View role with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://pizza-server-30q1.onrender.com/api/role/${id}`
      );
      setData((prevData) => prevData.filter((row) => row.id !== id));
      console.log("Deleted role with ID:", id);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://pizza-server-30q1.onrender.com/api/role",
        {
          roleName,
          permissions,
          restaurantId: userId,
        }
      );
      const newRole = {
        id: response.data._id,
        RoleName: response.data.roleName,
        CreatedAt: new Date(response.data.createdAt).toLocaleDateString(),
        isActive: response.data.isActive,
      };
      setData((prevData) => [...prevData, newRole]);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const columns = [
    { field: "RoleName", headerName: "Role Name", width: 250 },
    { field: "CreatedAt", headerName: "Created At", width: 250 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>
            {params.row.isActive ? "Active" : "Inactive"}
          </span>
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
          <FaEye
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={() => handleView(params.row.id)}
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
    <div
      className="flex flex-col lg:flex-row"
      style={{ height: "100vh", backgroundColor: "#f0f0f0" }}
    >
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto p-4 md:ml-60">
        <Navbar />
        <Paper
          elevation={3}
          className="p-4 mx-auto lg:ml-94"
          style={{
            marginTop: "20px",
            width: "90%",
            maxWidth: "1000px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF8100",
                "&:hover": {
                  backgroundColor: "#e07b00",
                },
              }}
              onClick={handleOpenModal}
            >
              Add Role
            </Button>
          </Typography>
          <div style={{ maxHeight: 1000, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              headerClassName="grey-row"
              disableSelectionOnClick
            />
          </div>
        </Paper>
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          PaperProps={{
            style: { borderRadius: "25px", padding: "20px 40px" },
          }}
        >
          <DialogTitle align="center">Role</DialogTitle>
          <DialogContent style={{ textAlign: "center" }}>
            <TextField
              label="Role Name"
              fullWidth
              variant="outlined"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "grey" },
                  "&:hover fieldset": { borderColor: "grey" },
                  "&.Mui-focused fieldset": { borderColor: "grey" },
                },
                "& .MuiInputLabel-root": { color: "grey" },
                "& .MuiInputLabel-root.Mui-focused": { color: "grey" },
              }}
            />
            <Typography
              variant="h6"
              gutterBottom
              style={{ textAlign: "left", margin: "10px" }}
            >
              Permissions
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {Object.keys(permissions).map((perm) => (
                <div
                  key={perm}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "48%",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permissions[perm]}
                        onChange={(e) =>
                          setPermissions({
                            ...permissions,
                            [perm]: e.target.checked,
                          })
                        }
                        sx={{
                          color: "#FF8100",
                          "&.Mui-checked": { color: "#FF8100" },
                        }}
                      />
                    }
                    label={perm.replace(/([A-Z])/g, " $1").trim()}
                  />
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              padding: "16px",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: "180px",
                height: "42px",
                margin: "20px auto",
                backgroundColor: "#FF8100",
                "&:hover": { backgroundColor: "#e07b00" },
              }}
            >
              Create
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{
                width: "180px",
                height: "42px",
                margin: "20px auto",
                backgroundColor: "#FF8100",
                "&:hover": { backgroundColor: "#e07b00" },
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <style>
          {`
            .grey-row .MuiDataGrid-colCell {
              background-color: #f2f2f2; /* Grey color */
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Role;
