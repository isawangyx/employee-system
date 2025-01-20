import React, { useState } from "react";
import { useRegisterMutation } from "../store/Authentication/authApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (departmentId === null) {
        alert("Please select a department.");
        return;
      }
      await register({ username, password, departmentId }).unwrap();
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        sx={{
          width: 400,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight={600}
          color="#223b63"
          mb={3}
        >
          Register
        </Typography>

        <form onSubmit={handleRegister}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Registration failed. Please try again.
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              select
              label="Select Department"
              value={departmentId ?? ""}
              onChange={(e) => setDepartmentId(Number(e.target.value))}
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem value="" disabled>
                Select Department
              </MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>HR</MenuItem>
              <MenuItem value={3}>PS</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ textTransform: "none" }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </Stack>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Already have an account?
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ textTransform: "none", mt: 1 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
