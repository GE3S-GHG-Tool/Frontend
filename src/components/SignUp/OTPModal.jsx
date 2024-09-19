import { useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const svgStyle = {
  marginBottom: "24px",
};

const buttonStyle = {
  border: "2px solid #28814d",
  color: "#28814d",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "30px",
  background: "#fff",
  marginTop: "16px",
};

const inputStyle = {
  width: "100%",
  marginBottom: "16px",
};

export default function OtpValidationModal({ open, handleClose, email }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const payload = {
        user_email: email,
        user_otp: otp,
      };
      const response = await axiosInstance.post(
        "/api/user/otp_validation",
        payload
      );
      if (response.status === 200) {
        navigate("/personalinfo");
      } else {
        setError("Incorrect OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP validation error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {/* SVG Icon */}
        <div style={svgStyle}>
          <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
            <circle
              cx="56"
              cy="56"
              r="56"
              fill="url(#paint0_linear_1214_40631)"
            />
            <path
              d="M56 32V56L72 72"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1214_40631"
                x1="0"
                y1="0"
                x2="129.671"
                y2="26.9392"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#51ADAC" />
                <stop offset="1" stopColor="#4FA874" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* OTP Validation Text */}
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          Enter OTP
        </Typography>
        <Typography
          id="modal-description"
          sx={{ fontSize: "16px", color: "#6C757D", marginBottom: "16px" }}
        >
          Please enter the 6-digit OTP sent to your email.
        </Typography>

        {/* OTP Input */}
        <TextField
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          variant="outlined"
          type="number"
          inputProps={{ maxLength: 6 }}
          error={!!error}
          helperText={error}
          sx={inputStyle}
        />

        {/* Verify Button */}
        <Button onClick={handleVerify} sx={buttonStyle} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Box>
    </Modal>
  );
}
