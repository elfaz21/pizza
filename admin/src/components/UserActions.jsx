import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { FaTrash, FaEdit } from "react-icons/fa";

const UserActions = ({ user, onEdit, onDelete, onToggleActive }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControlLabel
        control={
          <Switch
            checked={user.isActive}
            onChange={(event) => {
              event.stopPropagation(); // Prevent row selection
              onToggleActive(user.id);
            }}
            color={user.isActive ? "success" : "error"}
          />
        }
        label=""
      />
      <FaEdit
        style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
        onClick={() => onEdit(user)}
      />
      <FaTrash
        style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
        onClick={() => onDelete(user.id)}
      />
    </div>
  );
};

export default UserActions;
