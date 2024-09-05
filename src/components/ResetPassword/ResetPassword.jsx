import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./ResetPassword.css";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const isFormValid = email && true;

  return (
    <Wrapper>
      <div className="reset-container">
        <div>
          <img src={logo} alt="" className="ge3s_logo" />
          <h1>Reset Your Password</h1>
          <p id="otp-heading">We will send you OTP on your mail ID</p>
          <div className="input_reset">
            <p>Email</p>
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
                    style: { paddingLeft: '10px' }
                  }
                }}
            />
          </div>
          <button
            onClick={() => navigate("/organizationstepper")}
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
