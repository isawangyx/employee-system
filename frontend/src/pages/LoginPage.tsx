import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/Authentication/authApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login({ username, password }).unwrap();
      console.log("Login successful: ", token);
      localStorage.setItem("authToken", token); // Store the token
      alert("Login successful!");
      navigate("/"); // Redirect to the employee list page
    } catch (err) {
      console.error("Login failed:", err);
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
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Login failed. Please check your credentials.
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
                "Login"
              )}
            </Button>
          </Stack>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Don't have an account?
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/register")}
            sx={{ textTransform: "none", mt: 1 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
