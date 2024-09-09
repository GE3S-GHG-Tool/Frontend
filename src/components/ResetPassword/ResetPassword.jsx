import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./ResetPassword.css";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      setError("");
      navigate("/verify-otp");
    } else {
      setError("Please enter a valid email address");
    }
  };

  const isFormValid = email && validateEmail(email);

  return (
    <Wrapper>
      <div className="reset-container">
        <div>
          <img src={logo} alt="Logo" className="ge3s_logo" />
          <h1>Reset Your Password</h1>
          <p id="otp-heading">We will send you OTP on your email ID</p>
          <div className="input_reset">
            <p>Email</p>
            <TextField
              id="outlined-size-small"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Email"
              value={email}
              error={!!error}
              helperText={error}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(""); // Clear the error as the user types
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={isFormValid ? "send-button-active" : "send-button-disabled"}
          >
            Send
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
