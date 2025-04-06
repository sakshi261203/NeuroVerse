import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for button disable
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset errors before new attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Sorry, your password was incorrect. Please double-check your password.");
      } else {
        setError(error.message); // Show other errors
      }
    } finally {
      setLoading(false); // Enable button after attempt
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Red error message */}
        <button className="login" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup"><span>Sign up here</span></Link>
      </p>
    </div>
  );
};

export default Login;