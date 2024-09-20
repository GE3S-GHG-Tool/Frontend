import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../common/PasswordInput";
import axios from "axios";
import constant from "../../constant";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
    root: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordValid = password.trim() !== "";

    const isEmailValid = emailRegex.test(email);

    setError({
      email: email && !isEmailValid,
      password: password && !isPasswordValid,
    });
    setHelperText({
      email: email && !isEmailValid ? "Please enter a valid email address" : "",
      password: password && !isPasswordValid ? "Password cannot be empty" : "",
    });
    // Set form validity based on whether fields are valid
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_email: email,
      user_password: password,
    };
    // console.log(payload);

    // console.log("sendEmailOTP", response);
    try {
      const response = await axios.post(
        `${constant.BACKEDN_BASE_URL}api/auth/login`,
        payload
      );
      // console.log("sendEmailOTP", response);
      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        navigate("/");
      }
    } catch (err) {
      alert(err?.response?.data.message);
      setPassword("");
      // console.log("Error from sendEmailOTP ", err?.response?.data.message);
    }
  };

  return (
    <Wrapper>
      <div className="login-container">
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
          <img src={logo} alt="" className="ge3s_logo" />
          <h1>Generate reports quick and easy!</h1>
          <div className="login-inputs">
            <div className="input_login">
              <p>Email</p>
              <TextField
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                helperText={helperText.email}
              />
            </div>
            <div className="input_login">
              <p>Password</p>
              <div className="password-container">
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={error.password}
                  helperText={helperText.password}
                  placeholder={"Password"}
                />
              </div>
            </div>
          </div>

          {/* {errors.login && <p className="error-message">{errors.login}</p>} */}
          <button
            onClick={handleSubmit}
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
              onClick={() => navigate("/reset-password")}
            >
              Forgot your password?
            </p>
            <p className="signup">
              Don&apos;t have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>
          </div>
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
