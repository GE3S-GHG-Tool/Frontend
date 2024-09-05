import React from "react";
import TextField from "@mui/material/TextField";
import "./CreateAccount.css";
import Radio from "@mui/material/Radio";
import Wrapper from "../Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/ge3s_logo.png";
export default function CreateAccount() {
  const [selectedValue, setSelectedValue] = React.useState("");

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
            <TextField
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Password"
            />
          </div>
          <div className="input">
            <TextField
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Re-enter Password"
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
