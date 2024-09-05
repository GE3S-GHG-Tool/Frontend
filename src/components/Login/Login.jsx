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
      navigate("/home");
    }
  };

  const isFormValid = email && password;

  return (
    <Wrapper>
      <div className="login-container">
        <div>
          <img src={logo} alt="" className="ge3s_logo" />
          <h1>Generate reports quick and easy!</h1>
          <div className="login-inputs">
            <div className="input_login">
              <p>Email</p>
              <TextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <g clip-path="url(#clip0_1214_40689)">
                      <path d="M12.5 6.89258C18.5 6.89258 23.375 11.9238 23.375 11.9238C23.375 11.9238 18.5 16.9551 12.5 16.9551C6.5 16.9551 1.625 11.9238 1.625 11.9238C1.625 11.9238 6.5 6.89258 12.5 6.89258Z" stroke="#969696" stroke-miterlimit="10" />
                      <path d="M12.5 16.9551C15.3995 16.9551 17.75 14.7025 17.75 11.9238C17.75 9.14515 15.3995 6.89258 12.5 6.89258C9.60051 6.89258 7.25 9.14515 7.25 11.9238C7.25 14.7025 9.60051 16.9551 12.5 16.9551Z" stroke="#969696" stroke-miterlimit="10" />
                      <path d="M12.5 12.6426C12.9142 12.6426 13.25 12.3208 13.25 11.9238C13.25 11.5269 12.9142 11.2051 12.5 11.2051C12.0858 11.2051 11.75 11.5269 11.75 11.9238C11.75 12.3208 12.0858 12.6426 12.5 12.6426Z" stroke="#969696" stroke-width="2" stroke-miterlimit="10" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1214_40689">
                        <rect width="24" height="23" fill="white" transform="translate(0.5 0.423828)" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {errors.login && <p className="error-message">{errors.login}</p>}
          <button
            onClick={handleSubmit}
            // disabled={!isFormValid}
            className={
              isFormValid ? "login-button-active" : "login-button-disabled"
            }
          >
            Login
          </button>
          <div className="login-footer">
            <p
              className="forgot-password"
              onClick={() => navigate("/reset-password")}
            >
              Forgot your password?
            </p>
            <p className="signup">
              Don&apos;t have an account?{" "}
              <span onClick={() => navigate("/createaccount")}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
