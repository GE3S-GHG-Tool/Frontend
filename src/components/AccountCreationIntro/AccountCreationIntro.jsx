import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Wrapper from "../Wrapper/Wrapper";
import logo from "../../assets/images/ge3s_logo.png";
import "./AccountCreationIntro.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountCreationIntro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  // Check if the email field is not empty
  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      isTermsAccepted
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      alert("Form is valid and ready for submission!");
      // Proceed with form submission or further processing
    } else {
      alert("Please fill in all fields correctly and agree to the terms.");
    }
  };
  return (
    <Wrapper>
      <div className="registration-container">
        {/* This is the card component */}
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-card">
            {/* This is the header section */}
            <div className="registration-header">
              <img src={logo} alt="logo" className="header-logo" />
              <h2>Start Creating Your Account</h2>
            </div>
            {/* This is the form section */}
            <div className="form-field">
              <p>Verified Email Address</p>
              <TextField
                id="email-field"
                variant="outlined"
                size="small"
                fullWidth
                required
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <TextField
                id="password-field"
                type="password"
                variant="outlined"
                required
                name="password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                placeholder="Password"
              />
            </div>
            <div className="form-field">
              <TextField
                id="confirm-password-field"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                required
                placeholder="Confirm Password" // Updated placeholder text
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="terms-checkbox">
                <Radio
                  value="agree"
                  required
                  name="terms-radio"
                  inputProps={{ "aria-label": "Agree" }}
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                />
                <span>I agree to the </span>
                <span className="terms-highlight">Terms and Conditions</span>
              </div>
            </div>
            <button
              type="submit" // Change to "submit" to use form submission
              onClick={(e) => {
                if (isFormValid()) {
                  navigate("/create-account-successfully");
                } else {
                  e.preventDefault(); // Prevent navigation if form is not valid
                  alert(
                    "Please fill in all fields correctly and agree to the terms."
                  );
                }
              }}
              disabled={!isFormValid()} // Call function to get boolean value
              className={
                isFormValid() ? "acc-button-active" : "acc-button-disabled"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
