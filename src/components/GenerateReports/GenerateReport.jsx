import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./GenerateReports.css";
import logo from "../../../src/assets/images/ge3s.png";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export default function GenerateReports() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid = email && password;

  return (
    <Wrapper>
      <div className="login-container-2">
        <div>
          <img src={logo} alt="" className="ge3s_logo" />
          <h1>Generate reports quick and easy!</h1>
          <div className="input_login">
            <TextField
              id="outlined-size-small"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{
                input: {
                  style: { paddingLeft: "10px" },
                },
              }}
            />
          </div>
          <div className="input_login">
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
                slotProps={{
                  input: {
                    style: { paddingLeft: "10px" },
                  },
                }}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <g clipPath="url(#clip0_1214_40689)">
                    <path
                      d="M12.5 6.89258C18.5 6.89258 23.375 11.9238 23.375 11.9238C23.375 11.9238 18.5 16.9551 12.5 16.9551C6.5 16.9551 1.625 11.9238 1.625 11.9238C1.625 11.9238 6.5 6.89258 12.5 6.89258Z"
                      stroke="#969696"
                      stroke-miterlimit="10"
                    />
                    <path
                      d="M12.5 16.9551C15.3995 16.9551 17.75 14.7025 17.75 11.9238C17.75 9.14515 15.3995 6.89258 12.5 6.89258C9.60051 6.89258 7.25 9.14515 7.25 11.9238C7.25 14.7025 9.60051 16.9551 12.5 16.9551Z"
                      stroke="#969696"
                      stroke-miterlimit="10"
                    />
                    <path
                      d="M12.5 12.6426C12.9142 12.6426 13.25 12.3208 13.25 11.9238C13.25 11.5269 12.9142 11.2051 12.5 11.2051C12.0858 11.2051 11.75 11.5269 11.75 11.9238C11.75 12.3208 12.0858 12.6426 12.5 12.6426Z"
                      stroke="#969696"
                      strokeWidth="2"
                      stroke-miterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1214_40689">
                      <rect
                        width="24"
                        height="23"
                        fill="white"
                        transform="translate(0.5 0.423828)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
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
              Forgot your password ?
            </p>
          </div>

          <div
            style={{
              width: "80%",
              height: "16vh",
              borderRadius: "50%",
              margin: "0 auto",
              position: "absolute",
              bottom: "-20px",
              left: "10%",
              background: "#598483",
              filter: "blur(20px)",
              opacity: 0.8,
              zIndex: -1,
            }}
          ></div>
        </div>
      </div>
    </Wrapper>
  );
}
