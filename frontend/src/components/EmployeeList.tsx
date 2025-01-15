import React from "react";
import { Box, Grid } from "@mui/material";
import EmployeeCard from "./EmployeeCard";
import { Employee } from "../types/Employee";

type EmployeeListProps = {
  employees: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
    <Grid container spacing={2}>
      {employees.map((employee) => (
        <Grid item xs={12} sm={6} key={employee.id}>
          <EmployeeCard
            employee={employee}
            onEdit={() => onEdit(employee.id)}
            onDelete={() => onDelete(employee.id)}
          />
        </Grid>
      ))}
    </Grid>
    </Box>
  );
};

export default EmployeeList;
