import { useState } from "react";
import { useRegisterMutation } from "../store/Authentication/authApi";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      if (departmentId === null) {
        alert("Please select a department.");
        return;
      }

      await register({ username, password, departmentId }).unwrap();
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        onChange={(e) => setDepartmentId(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          Select Department
        </option>
        <option value={1}>Admin</option>
        <option value={2}>HR</option>
        <option value={3}>PS</option>
      </select>
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && (
        <p style={{ color: "red" }}>Registration failed. Please try again.</p>
      )}
    </div>
  );
}
