import React from "react";
import {
  Avatar,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Wrapper from "../Wrapper/Wrapper";
import upload from "../../assets/images/Upload.svg";
import logo from "../../assets/images/ge3s_logo.png";
import profile from "../../assets/images/profile.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountCreationHeader() {
  // Opens a file picker and shows the selected file name.
  const handleButtonClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        alert("File selected: " + file.name);
      }
    };
    fileInput.click();
  };
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // input condition check
  const isFormValid = name.trim().length >= 5;

  const paperStyle = {
    padding: "2.45rem 3.5375rem",
    height: "440px", // Roughly 60% of the viewport height (adjust as needed)
    width: "430px", // Roughly 40% of the viewport width (adjust as needed)
    border: "1px solid rgba(217, 217, 217, 0.4)",
    borderRadius: "28px",
    boxShadow: "6px 89px 56px -38px rgba(89, 132, 131, 0.65)",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  };
  return (
    <Wrapper>
      <Grid2>
        <Paper style={paperStyle}>
          {/* Header Grid */}
          <Grid2
            align="center"
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Grid2 item>
              <Avatar
                src={logo}
                style={{ height: "55px", width: "58px" }}
              ></Avatar>
            </Grid2>
            <Grid2 item>
              <Typography
                variant="h2"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  lineHeight: "3rem",
                  width: "380px",
                  height: "48px",
                  color: "rgba(0, 25, 29, 1)",
                  letter: "-1",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Start creating your account
              </Typography>
            </Grid2>
          </Grid2>
          {/* profile section grid */}
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <Avatar
              src={profile}
              style={{ height: "80px", width: "80px" }}
            ></Avatar>
            <Button
              onClick={handleButtonClick}
              style={{
                border: "1px solid ",
                width: "165px",
                height: "40px",
                gap: "10px",
                display: "flex",
                flexDirection: "row",
                lineHeight: "16.63px",
                border: "1px solid rgba(217, 217, 217, 0.4)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={upload}></img>
              <Typography
                sx={{ textTransform: "capitalize", color: "#717171" }}
              >
                Upload Photo
              </Typography>
            </Button>
            <TextField
              placeholder="Full Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Grid2>
          {/* Submit buttun grid */}
          <Grid2>
            <Button
              onClick={() => navigate("/account-Intro")}
              disabled={!isFormValid}
              sx={{
                width: "100%",
                fontSize: "14px",
                borderRadius: "32px",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "600",
                lineHeight: "16px",
                height: "40px",
                mt: "10px",
                textTransform: "capitalize",
                background: isFormValid
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
  );
}

export default AccountCreationHeader;
