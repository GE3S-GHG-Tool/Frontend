import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./ResetPassword.css";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import constant from "../../constant";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    const isEmailValid = email.trim() !== "" && validateEmail(email);
    const shouldShowError = email.trim() !== "" && !isEmailValid;

    setHelperText(shouldShowError ? "Please enter a valid email address" : "");

    setError(shouldShowError);

    setIsFormValid(isEmailValid);
  }, [email]);

  const handleSubmit = async () => {
    const payload = {
      user_email: email,
    };

    try {
      const response = await axios.post(
        `${constant.BACKEDN_BASE_URL}api/user/initiate-reset-password`,
        payload
      );
      console.log("reset", response);
      if (response.status === 200) {
        navigate("/otppage", { state: { email: email } });
      }
    } catch (error) {
      setHelperText(error?.response?.data.message);
      // alert(error?.response?.data.message);
    }
  };

  return (
    <Wrapper>
      <div className="reset-container">
        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "white",
            borderRadius: "20px",
            gap: "8px",
            padding: "24px",
          }}
        >
          <img src={logo} alt="Logo" className="ge3s_logo" />
          <h1>Reset Your Password</h1>
          <p id="otp-heading">We will send you OTP on your email ID</p>
          <div className="input_reset">
            <p>Email</p>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Email"
              value={email}
              error={error}
              helperText={helperText}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={
              isFormValid ? "send-button-active" : "send-button-disabled"
            }
          >
            Send
          </button>
        </div>
        <div
          style={{
            width: "80%",
            height: "16vh",
            borderRadius: "50%",
            margin: "0 auto",
            position: "absolute",
            bottom: "-12px",
            left: "10%",
            background: "#598483",
            filter: "blur(20px)",
            opacity: 0.8,
            zIndex: 0,
          }}
        ></div>
      </div>
    </Wrapper>
  );
}
