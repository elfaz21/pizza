import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import UserActions from "./UserActions";

const UserTable = ({ data, onEdit, onDelete, onToggleActive }) => {
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
        <UserActions
          user={params.row}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ),
    },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      pageSize={5}
      headerClassName="light-red-header"
      disableSelectionOnClick
    />
  );
};

export default UserTable;
