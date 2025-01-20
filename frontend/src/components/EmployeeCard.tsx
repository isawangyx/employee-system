import React from "react";
import { Card, CardContent, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee } from "../types/Employee";

type EmployeeCardProps = {
  employee: Employee;
  onEdit: () => void;
  onDelete: () => void;
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        display: "flex",
        justifyContent: "space-between",
        padding: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <CardContent>
        <div
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#223b63",
            marginBottom: "0.25rem",
          }}
        >
          {employee.name}
        </div>
        <div
          style={{
            fontWeight: 500,
            color: "#223b63",
          }}
        >
          {employee.departmentId === 2 ? "HR" : "PS"}
        </div>
        <div style={{ color: "#223b63" }}>${employee.salary}</div>
      </CardContent>

      <Box display="flex" alignItems="center">
        <IconButton sx={{ color: "#f0ca41" }} onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default EmployeeCard;
