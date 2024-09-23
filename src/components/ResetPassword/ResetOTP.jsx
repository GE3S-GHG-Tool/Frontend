import { useState, useEffect } from "react";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import "../VerifyOTP/VerifyOTP.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import constant from "../../constant";
import axios from "axios";
import { Typography } from "@mui/material";
export default function ResetOTP() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const [otperror, setOtpError] = useState("");
  const isFormValid = otp.length === 6;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    const payload = {
      user_email: location.state.email,
    };

    try {
      const response = await axios.post(
        `${constant.BACKEDN_BASE_URL}api/user/initiate-reset-password`,
        payload
      );
      console.log("reset", response);
      if (response.status === 200) {
        setOtp("");
        setTimeLeft(30);
      }
    } catch (error) {
      setOtp("");
      alert(error?.response?.data.message);
    }
  };

  const handleVerify = async () => {
    const payload = {
      user_email: location.state.email,
      user_otp: otp,
    };

    try {
      const response = await axios.post(
        `${constant.BACKEDN_BASE_URL}api/user/reset-password-opt-validation`,
        payload
      );
      if (response.status === 200) {
        navigate("/change-password");
        localStorage.setItem("resettoken", response?.data?.token);
      }
    } catch (error) {
      setOtpError(error?.response?.data.message);
    }
  };
  return (
    <Wrapper>
      <div className="verify-container">
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
          <img src={logo} alt="ge3s_logo" className="ge3s_logo" />
          <h1>Enter the OTP sent to your Email ID</h1>
          <span id="email-address">
            <span>{location?.state?.email}</span>
            <span
              id="edit-email-link"
              className="theme-color"
              onClick={() => navigate("/reset-password")}
            >
              Edit Email ID
            </span>
          </span>
          <p className="timer">
            <svg width="20" height="20" viewBox="0 0 25 25" fill="none">
              <g clipPath="url(#clip0_1214_40831)">
                <path
                  d="M12.5 21.4248C17.4706 21.4248 21.5 17.3954 21.5 12.4248C21.5 7.45424 17.4706 3.4248 12.5 3.4248C7.52944 3.4248 3.5 7.45424 3.5 12.4248C3.5 17.3954 7.52944 21.4248 12.5 21.4248Z"
                  stroke="#717171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 7.1748V12.4248H17.75"
                  stroke="#717171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1214_40831">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5 0.424805)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="theme-color">{timeLeft}s</span>
            <span className="resend-otp theme-color" onClick={handleResend}>
              Resend OTP
            </span>
          </p>
          <div>
            <MuiOtpInput
              sx={{
                fontWeight: "500",
                "& .MuiOutlinedInput-root fieldset": {
                  height: "50px",
                  borderColor: otperror ? "#FF5151 !important" : "#F3F3F3",
                },
                "& .MuiInputBase-input": {
                  padding: "12px",
                  fontWeight: "500",
                },
              }}
              value={otp}
              onChange={(value) => setOtp(value)}
              length={6}
              autoFocus
              error={!!otperror}
            />
            {otperror && (
              <Typography color="error" variant="body2" mt={1}>
                {otperror}
              </Typography>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={!isFormValid}
            className={
              !isFormValid ? "verify-button-disabled" : "verify-button-active"
            }
          >
            Verify OTP
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
