import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";

const UserDialog = ({ open, onClose, onSubmit, user, roles, isEdit }) => {
  const [newUser, setNewUser] = React.useState(
    user || {
      name: "",
      email: "",
      phoneNo: "",
      location: "",
      role: "",
      password: "",
    }
  );

  React.useEffect(() => {
    setNewUser(user);
  }, [user]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { borderRadius: 25, padding: "20px" } }}
    >
      <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        {["name", "email", "phoneNo", "location", "password"].map((field) => (
          <TextField
            key={field}
            margin="dense"
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            fullWidth
            variant="outlined"
            name={field}
            value={newUser[field]}
            onChange={handleChange}
            type={field === "password" ? "password" : "text"}
          />
        ))}
        <TextField
          select
          margin="dense"
          label="Select Role"
          variant="outlined"
          name="role"
          value={newUser.role}
          onChange={handleChange}
          fullWidth
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
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
            onClick={() => onSubmit(newUser)}
            variant="contained"
            sx={{
              backgroundColor: "#FF8100",
              "&:hover": { backgroundColor: "#e07b00" },
            }}
          >
            {isEdit ? "Update" : "Add"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
