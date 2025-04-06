import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./../App.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State to disable button
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before a new attempt
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      handleAuthErrors(error.code);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Firebase error codes
  const handleAuthErrors = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setError("This email is already registered. Try logging in.");
        break;
      case "auth/invalid-email":
        setError("Please enter a valid email address.");
        break;
      case "auth/weak-password":
        setError("Password is too weak. Use a stronger password.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your connection.");
        break;
      default:
        setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        {error && <p className="error-message">{error}</p>} {/* Red error message below password */}
        <button className='login' type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/"><span>Login here</span></Link>
      </p>
    </div>
  );
};

export default Signup;