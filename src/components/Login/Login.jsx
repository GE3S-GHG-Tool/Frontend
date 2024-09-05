import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setErrors({ login: "The email or password you entered is incorrect." });
    }
  };

  const isFormValid = email && password;

  return (
    <Wrapper>
      <div className="login-container">
        <div>
          <img src={logo} alt="" className="ge3s_logo" />
          <h1>Generate reports quick and easy!</h1>
          <div className="input_login">
            <p>Email</p>
            <TextField
              id="outlined-size-small"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Email"
              value={email}
              slotProps={{
                input: {
                  style: { paddingLeft: "10px" },
                  border: "2px solid transparent",
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              className="gradient-focus"
            />
          </div>
          <div className="input_login">
            <p>Password</p>
            <div className="password-container">
              <TextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                slotProps={{
                  input: {
                    style: { paddingLeft: "10px" },
                    border: "2px solid transparent",
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                className="gradient-focus"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* SVG eye icon */}
              </span>
            </div>
          </div>
          {errors.login && <p className="error-message">{errors.login}</p>}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={
              isFormValid ? "login-button-active" : "login-button-disabled"
            }
          >
            Login
          </button>
          <div className="login-footer">
            <p
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </p>
            <p className="signup">
              Don't have an account?{" "}
              <span onClick={() => navigate("/createaccount")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
