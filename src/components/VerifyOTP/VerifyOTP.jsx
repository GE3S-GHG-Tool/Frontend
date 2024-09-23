import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import logo from "../../assets/images/ge3s.png";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../context/User-signup";
import { verifyOtp } from "../../api/auth";

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

export default function OtpModal({ email, open, handleClose }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthToken } = useSignup();

  const isFormValid = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (open) {
      document.getElementById("otp-input-0")?.focus();
    }
  }, [open]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    if (!isFormValid) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    const result = await verifyOtp(email, otp.join(""), setAuthToken);

    if (result.success) {
      navigate("/personalinfo");
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <img
          src={logo}
          alt=""
          style={{ width: "48px", marginBottom: "16px" }}
        />
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          Enter the OTP sent to your Email ID
        </Typography>
        <Typography
          sx={{ fontSize: "16px", color: "#6C757D", marginBottom: "16px" }}
        >
          {email}
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "#717171", marginRight: "8px" }}
          >
            {timeLeft}s
          </Typography>
          <Button
            onClick={() => setTimeLeft(30)}
            disabled={timeLeft > 0}
            sx={{ fontSize: "14px", color: "#28814d" }}
          >
            Resend OTP
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "24px",
          }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
              }}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              sx={{ width: "48px" }}
            />
          ))}
        </Box>
        {error && (
          <Typography sx={{ color: "error.main", marginBottom: "16px" }}>
            {error}
          </Typography>
        )}
        <Button
          onClick={handleVerify}
          disabled={!isFormValid || isLoading}
          sx={{
            border: "2px solid #28814d",
            color: "#28814d",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "30px",
            background: "#fff",
            "&:hover": {
              background: "#28814d",
              color: "#fff",
            },
            "&:disabled": {
              border: "2px solid #ccc",
              color: "#ccc",
            },
          }}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Box>
    </Modal>
  );
}
