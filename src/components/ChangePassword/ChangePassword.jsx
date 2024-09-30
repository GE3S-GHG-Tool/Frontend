import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "./ChangePassword.css";
import SuccessModal from "./SuccessModal";
import logo from "../../assets/images/ge3s.png";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../common/PasswordInput";
import axios from "axios";
import constant from "../../constant";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [helperText, setHelperText] = useState({
    password: "",
    confirmPassword: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("resettoken");
  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const isPasswordValid = passwordRegex.test(password);
    const isConfirmPasswordValid = password === confirmPassword;

    setError({
      password: password && !isPasswordValid,
      confirmPassword: confirmPassword && !isConfirmPasswordValid,
    });

    setHelperText({
      password:
        password && !isPasswordValid
          ? "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character"
          : "",
      confirmPassword:
        confirmPassword && !isConfirmPasswordValid
          ? "Passwords do not match"
          : "",
    });

    setIsFormValid(isPasswordValid && isConfirmPasswordValid);
  }, [password, confirmPassword]);

  const handleChangePassword = async () => {
    const data = {
      user_password: password,
      user_confirm_password: confirmPassword,
    };

    try {
      const res = await axios.post(
        `${constant.BACKEDN_BASE_URL}api/user/reset-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("reset", res);
      if (res?.status === 200) {
        setOpenModal(true);
      } else {
        throw new Error("Could not reset password");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      setErrorMessage(error?.response?.data?.message);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/login");
    localStorage.removeItem("resettoken");
  };

  return (
    <Wrapper>
      <div className="change-password-container">
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
          <img src={logo} alt="GE3S Logo" className="ge3s_logo" />
          <h1>Change your password</h1>
          <p className="text-align">
            Enter a new password below to change your password
          </p>

          <div className="input-password">
            <p>Password</p>
            <div className="password-container">
              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={error.password}
                helperText={helperText.password}
                placeholder={"Password"}
              />
            </div>
            <p>Confirm Password</p>
            <div className="password-container">
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                error={error.password}
                helperText={helperText.confirmPassword}
              />
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
            onClick={handleChangePassword}
            disabled={!isFormValid}
            className={
              isFormValid
                ? "change-password-button-active"
                : "change-password-button-disabled"
            }
          >
            Change Password
          </button>
          <SuccessModal open={openModal} handleClose={handleCloseModal} />
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
