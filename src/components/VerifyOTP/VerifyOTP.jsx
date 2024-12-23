import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import logo from "../../assets/images/ge3s.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignup } from "../../context/User-signup";
import { initiateSignup, verifyOtp } from "../../api/auth";
import constant from "../../constant";
import Wrapper from "../Wrapper/Wrapper";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function OtpModal() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const [otperror, setOtpError] = useState("");
  const isFormValid = otp.length === 6;
  const { setAuthToken } = useSignup();
  // console.log(location.state.email);
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    const response = await initiateSignup(location.state.email);
    if (response.status === 200) {
      setOtpError("");
      setTimeLeft(30);
    } else {
      setOtpError(response?.response?.data?.message);
    }
  };

  const handleVerify = async () => {
    setOtpError("");
    const result = await verifyOtp(location.state.email, otp, setAuthToken);
    if (result) {
      navigate("/account-verified");
    } else {
      setOtpError(result.error); 
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
              onClick={() => navigate("/signup")}
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
            <span style={{ minWidth: "30px" }} className="theme-color">
              {timeLeft}s
            </span>
            <span
              style={{
                marginLeft: "5px",
                cursor: timeLeft === 0 ? "pointer" : "default",
                color: timeLeft === 0 ? "#28814d" : "#717171",
              }}
              onClick={() => {
                if (timeLeft === 0) {
                  handleResend();
                } else {
                  console.log("Resend OTP after timer is finised");
                }
              }}
            >
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
            className="ge3s_button"
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
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-title"
    //   aria-describedby="modal-description"
    // >
    //   <Box sx={style}>
    //     <img
    //       src={logo}
    //       alt=""
    //       style={{ width: "48px", marginBottom: "16px" }}
    //     />
    //     <Typography
    //       variant="h5"
    //       component="h2"
    //       sx={{ fontWeight: "bold", marginBottom: "16px" }}
    //     >
    //       Enter the OTP sent to your Email ID
    //     </Typography>
    //     <Typography
    //       sx={{ fontSize: "16px", color: "#6C757D", marginBottom: "16px" }}
    //     >
    //       {email}
    //     </Typography>
    //     <Box
    //       sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
    //     >
    //       <Typography
    //         sx={{ fontSize: "14px", color: "#717171", marginRight: "8px" }}
    //       >
    //         {timeLeft}s
    //       </Typography>
    //       <Button
    //         onClick={() => setTimeLeft(30)}
    //         disabled={timeLeft > 0}
    //         sx={{ fontSize: "14px", color: "#28814d" }}
    //       >
    //         Resend OTP
    //       </Button>
    //     </Box>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "100%",
    //         marginBottom: "24px",
    //       }}
    //     >
    //       {otp.map((digit, index) => (
    //         <TextField
    //           key={index}
    //           id={`otp-input-${index}`}
    //           type="text"
    //           inputProps={{
    //             maxLength: 1,
    //             style: { textAlign: "center" },
    //           }}
    //           value={digit}
    //           onChange={(e) => handleChange(e, index)}
    //           onKeyDown={(e) => handleKeyDown(e, index)}
    //           sx={{ width: "48px" }}
    //         />
    //       ))}
    //     </Box>
    //     {error && (
    //       <Typography sx={{ color: "error.main", marginBottom: "16px" }}>
    //         {error}
    //       </Typography>
    //     )}
    //     <Button
    //       onClick={handleVerify}
    //       disabled={!isFormValid || isLoading}
    //       sx={{
    //         border: "2px solid #28814d",
    //         color: "#28814d",
    //         padding: "12px 24px",
    //         fontSize: "16px",
    //         fontWeight: "bold",
    //         borderRadius: "30px",
    //         background: "#fff",
    //         "&:hover": {
    //           background: "#28814d",
    //           color: "#fff",
    //         },
    //         "&:disabled": {
    //           border: "2px solid #ccc",
    //           color: "#ccc",
    //         },
    //       }}
    //     >
    //       {isLoading ? "Verifying..." : "Verify OTP"}
    //     </Button>
    //   </Box>
    // </Modal>
  );
}
