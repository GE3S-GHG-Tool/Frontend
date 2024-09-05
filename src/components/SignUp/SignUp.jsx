import TextField from "@mui/material/TextField";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="signup_page">
        <h1>Create a free account!</h1>
        <div className="email_field">
          <p>Email</p>
          <TextField
            id="outlined-size-small"
            label=""
            variant="outlined"
            size="small"
            fullWidth
          />
          <button onClick={() => navigate("/createaccount")}>Sign up</button>
        </div>
      </div>
    </Wrapper>
  );
}
