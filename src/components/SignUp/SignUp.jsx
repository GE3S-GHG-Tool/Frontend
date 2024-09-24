import TextField from "@mui/material/TextField";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import logo from "../../assets/images/ge3s_logo.png";
import { useEffect, useState } from "react";
import { validateEmail } from "../../util/utils";
import axiosInstance from "../../util/axiosInstance";
import { useSignup } from "../../context/User-signup";
// import VerifyModal from "../VerifyOTP/VerifyOTP";
import { initiateSignup } from "../../api/auth";
import VerifyOTP from "../VerifyOTP/VerifyOTP";

export default function SignUp() {
  const { email, setEmail } = useSignup();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [helperText, setHelperText] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const isEmailValid = email.trim() !== "" && validateEmail(email);
    const shouldShowError = email.trim() !== "" && !isEmailValid;

    setHelperText({
      email: shouldShowError ? "Please enter a valid email address" : "",
    });

    setError(shouldShowError);

    setIsFormValid(isEmailValid);
  }, [email]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setApiError("");

    const response = await initiateSignup(email);
    console.log(response);

    if (response.status === 200) {
      navigate("/verify-otp", {
        state: { email },
      });
    } else {
      setApiError(response?.response?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <div className="signup_page">
        <img src={logo} alt="logo" className="brand_logo" />
        <h1>Create a free account!</h1>
        <div className="email_field">
          <p>Email</p>
          <TextField
            variant="outlined"
            placeholder="Enter Email"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => {
              setApiError("");
              setEmail(e.target.value);
            }}
            error={error}
            helperText={helperText.email}
          />
          {apiError && <span className="error-text">{apiError}</span>}
          <button
            className="ge3s_button"
            disabled={!isFormValid || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
        <h6>
          Already have an account?{" "}
          <h5 onClick={() => navigate("/login")}>Login</h5>
        </h6>

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
    </Wrapper>
  );
}
