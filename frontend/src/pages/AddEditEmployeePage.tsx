import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import {
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useGetEmployeesQuery,
} from "../store/Employees/employeeApi";

const AddEditEmployeePage = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const { id } = useParams<{ id: string }>();
  const [addEmployee] = useAddEmployeeMutation();
  const [editEmployee] = useEditEmployeeMutation();
  const { data } = useGetEmployeesQuery({ page: currentPage });
  const employees = data?.employees;

  const [name, setName] = useState("");
  const [department, setDepartment] = useState<"HR" | "PS" | "">("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && employees) {
      const employee = employees.find((emp) => emp.id === Number(id));
      if (employee) {
        setName(employee.name);
        setDepartment(employee.department);
        setSalary(employee.salary.toString());
      }
    }
  }, [id, employees]);

  const validateFields = () => {
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError("Name must contain only letters and spaces.");
      return false;
    }

    if (name.length < 4 || name.length > 30) {
      setError("Name must be between 4 and 30 characters.");
      return false;
    }
    if (!/^\d+$/.test(salary) || Number(salary) <= 0) {
      setError("Salary must be a positive number.");
      return false;
    }
    if (!["HR", "PS"].includes(department)) {
      setError("Please select a valid department.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      if (id) {
        await editEmployee({
          id: Number(id),
          name,
          department: department as "HR" | "PS",
          salary: Number(salary),
        }).unwrap();
      } else {
        await addEmployee({
          name,
          department: department as "HR" | "PS",
          salary: Number(salary),
        }).unwrap();
      }
      navigate("/");
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">
          {id ? "Edit Employee" : "Add Employee"}
        </Typography>
        <NavLink
          to={`/?page=${currentPage}`}
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
        </NavLink>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            helperText="Name must be between 4 and 30 characters"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            required
            type="number"
            helperText="Enter a positive number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value as "HR" | "PS" | "")}
            fullWidth
            required
          >
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="PS">PS</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ textTransform: "none" }}
        >
          {id ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditEmployeePage;
