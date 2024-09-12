import TextField from "@mui/material/TextField";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import logo from "../../assets/images/ge3s_logo.png";
import VerfiedModal from "./VerfiedModal";
import { useEffect, useState } from "react";
import { validateEmail } from "../../util/utils";
export default function SignUp() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [helperText, setHelperText] = useState({
    email: "",
  });
  useEffect(() => {
    const isEmailValid = email.trim() !== "" && validateEmail(email);
    const shouldShowError = email.trim() !== "" && !isEmailValid;

    setHelperText({
      email: shouldShowError ? "Please enter a valid email address" : "",
    });

    setError(shouldShowError);

    setIsFormValid(isEmailValid);
  }, [email]);
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
            laebl=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            helperText={helperText.email}
          />
          <button
            className="ge3s_button"
            disabled={!isFormValid}
            onClick={() => navigate("/personalinfo")}
          >
            Confirm
          </button>
        </div>
        <h6>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
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
      <VerfiedModal open={openModal} handleClose={() => setOpenModal(false)} />
    </Wrapper>
  );
}
