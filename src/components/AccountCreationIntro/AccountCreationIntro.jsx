import React from "react";
import Wrapper from "../Wrapper/Wrapper";
import { Button, Grid2, Paper, Typography } from "@mui/material";
import logo from "../../assets/images/ge3s_logo.png";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

function AccountCreationIntro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();
  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      isTermsAccepted
    );
  };
  const paperStyle = {
    height: "485px",
    width: "480px",
    border: "1px solid rgba(217, 217, 217, 0.4)",
    borderRadius: "20px",
    boxShadow: "6px 89px 56px -38px rgba(89, 132, 131, 0.65)",
    display: "flex",
    flexDirection: "column",
    padding: "38px 47px 38px 47px",
    gap: "26px",
  };
  return (
    <div>
      <Wrapper>
        <Grid2>
          <Paper style={paperStyle}>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Grid2 item>
                <img src={logo} height="57px" width="60px" alt="logo" />
              </Grid2>
              <Grid2 item>
                <Typography
                  variant="p"
                  fontSize="26px"
                  letterSpacing="-1"
                  width="416px"
                  fontWeight="600"
                  lineHeight="48px"
                >
                  Start creating your account
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <Typography
                variant="p"
                fontWeight="400"
                fontSize="14px"
                lineHeight="24px"
                color="#717171"
              >
                Verified Email Address
              </Typography>
              <TextField
                placeholder="email"
                size="small"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                padding="10px 16px 10px 16px"
                border="1px solid #D9D9D9"
                sx={{
                  height: "42px", // Adjust this value as needed
                }}
              ></TextField>
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "26px" }}
            >
              <TextField
                placeholder="Password"
                size="small"
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  height: "42px", // Adjust this value as needed
                }}
              ></TextField>
              <TextField
                placeholder="Re-Password"
                size="small"
                name="re-password"
                required
                value={confirmPassword} // Fixed value here
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  height: "42px", 
                }}
              ></TextField>
            </Grid2>
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "2px",
                marginTop: "-16px",
                marginLeft: "-10px",
              }}
            >
              <Radio
                value="agree"
                required
                name="terms-radio"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                sx={{
                  color: "#3CB457", 
                  "&.Mui-checked": {
                    color: "#4FA874",
                  },
                }}
              />
              <Typography variant="p" fontWeight="400" fontSize="18px">
                I agree to the{" "}
              </Typography>
              <Typography
                variant="p"
                fontWeight="500"
                fontSize="18px"
                color="#3CB457"
              >
                Terms and Conditions.
              </Typography>
            </Grid2>
            <Grid2>
              <Button
                onClick={() => navigate("/create-account-successfully")}
                disabled={!isFormValid()}
                sx={{
                  width: "100%",
                  fontSize: "16px",
                  borderRadius: "32px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "600",
                  lineHeight: "12px",
                  padding: "20px 62px 20px 62px",
                  backgroundColor: "#E7E7E7",
                  // color: "#838383",
                  height: "42px",
                  textTransform: "capitalize",
                  background: isFormValid()
                    ? "linear-gradient(102deg, #369d9c 0%, #28814d 100%)"
                    : "linear-gradient(102deg, #e7e7e7 0%, #e7e7e7 100%)",
                  color: isFormValid ? "#ffffff" : "#838383",
                  border: isFormValid
                    ? "1px solid rgba(217, 217, 217, 0.4)"
                    : "none",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                  "&:hover": {
                    background: isFormValid
                      ? "linear-gradient(102deg, #28814d 0%, #369d9c 100%)"
                      : "linear-gradient(102deg, #e7e7e7 0%, #e7e7e7 100%)",
                  },
                }}
              >
                Create account
              </Button>
            </Grid2>
          </Paper>
        </Grid2>
      </Wrapper>
    </div>
  );
}

export default AccountCreationIntro;
