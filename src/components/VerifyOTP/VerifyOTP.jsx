import React, { useState, useEffect } from "react";
import "./VerifyOTP.css";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  const isFormValid = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    document.getElementById("otp-input-0")?.focus();
  }, []);

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

  return (
    <Wrapper>
      <div className="verify-container">
        <div style={{
          position: 'relative',
          zIndex: 1,
          background: 'white',
          borderRadius: '20px',
          gap: '8px',
          padding: '24px'
        }}>
          <img src={logo} alt="" className="ge3s_logo" />
          <h1>Enter the OTP sent to your Email ID</h1>
          <span id="email-address">
            <span id="email">Aman@gmail.com</span>
            <span id="edit-email-link" className="theme-color">
              Edit Email ID
            </span>
          </span>
          <p className="timer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
            >
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
            <span
              className="resend-otp theme-color"
              onClick={() => setTimeLeft(30)}
              disabled={timeLeft > 0}
            >
              Resend OTP
            </span>
          </p>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-input"
              />
            ))}
          </div>
          <button
            onClick={() => navigate("/change-password")}
            disabled={!isFormValid}
            className={
              !isFormValid ? "verify-button-disabled" : "verify-button-active"
            }
          >
            Verify OTP
          </button>
        </div>
        <div style={{
          width: '80%',
          height: '16vh',
          borderRadius: '50%',
          margin: '0 auto',
          position: 'absolute',
          bottom: '-12px',
          left: '10%',
          background: '#598483',
          filter: 'blur(20px)',
          opacity: 0.8,
          zIndex: 0,
        }}></div>
      </div>
    </Wrapper>
  );
}
