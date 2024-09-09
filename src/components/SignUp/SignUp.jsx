import TextField from "@mui/material/TextField";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import logo from "../../assets/images/ge3s_logo.png";
import VerfiedModal from "./VerfiedModal";
import { useState } from "react";
export default function SignUp() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
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
          />
          <button onClick={() => navigate("/personalinfo")}>Confirm</button>
        </div>
        <h6>
          Already have an account? <span>Login</span>
        </h6>
      </div>
      <VerfiedModal open={openModal} handleClose={() => setOpenModal(false)} />
    </Wrapper>
  );
}
