import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./CreateAccount.css";
import Radio from "@mui/material/Radio";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/ge3s_logo.png";
import PasswordInput from "../common/PasswordInput";
export default function CreateAccount() {
  const [selectedValue, setSelectedValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="createacc">
        <img src={logo} alt="logo" width={45} />
        <h1>Start creating your account</h1>
        <div>
          <div className="input">
            <p>Verified Email Address</p>
            <TextField
              value={"unmoy@growhut.in"}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: " #3CB477",
                },
              }}
            />
          </div>
          <div className="input">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // error={error.password}
              // helperText={helperText.password}
              placeholder={"Password"}
            />
          </div>
          <div className="input">
            <PasswordInput
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // error={error.password}
              // helperText={helperText.password}
              placeholder={"Re-enter Password"}
            />
          </div>
        </div>
        <div className="radio_field">
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ "aria-label": "A" }}
            size="small"
            sx={{
              color: "#ddd",
              "&.Mui-checked": {
                color: "#3CB477",
              },
            }}
          />
          <span>I agree to the </span>
          <span className="colored">terms and conditions</span>
        </div>
        <button
          // disabled
          className="ge3s_button"
          onClick={() => {
            navigate("/organizationstepper");
          }}
        >
          Create Account
        </button>
      </div>
    </Wrapper>
  );
}
