import TextField from "@mui/material/TextField";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import logo from "../../assets/images/ge3s_logo.png";
export default function SignUp() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="signup_page">
        <img src={logo} alt="logo" className="brand_logo" />
        <h1>Create a free account!</h1>
        <div className="email_field">
          <p>Email</p>
          <TextField placeholder="Enter Email" size="small" fullWidth />
          <button onClick={() => navigate("/createaccount")}>Sign up</button>
        </div>
      </div>
    </Wrapper>
  );
}
