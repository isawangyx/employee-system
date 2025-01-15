import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
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
        <Typography variant="h5" component="div" color="#223b63" fontWeight={600} >
          {employee.name}
        </Typography>
        <Typography variant="body2" color="#223b63">
          {employee.department}
        </Typography>
        <Typography variant="body1" color="#223b63">
          ${employee.salary}
        </Typography>
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
