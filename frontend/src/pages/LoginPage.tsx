import { useState } from "react";
import { useLoginMutation } from "../store/Authentication/authApi";

export default function LoginPage({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap(); // Use unwrap to handle resolved data
      localStorage.setItem("authToken", response.token); // Save token
      setToken(response.token); // Pass token to parent state or context
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: Incorrect credentials.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>Login failed. Please try again.</p>}
    </div>
  );
}
