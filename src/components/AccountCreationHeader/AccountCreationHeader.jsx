import React, { useState } from "react";
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
import profile from "../../assets/images/profile.svg"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

function AccountCreationHeader() {
  // State to store the uploaded image URL
  const [uploadedImage, setUploadedImage] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Handles image upload and sets the uploaded image URL to display in Avatar
  const handleButtonClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Accept only image files
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Create URL for the selected image
        setUploadedImage(imageUrl); // Set the image URL to display in Avatar
      }
    };
    fileInput.click();
  };

  // Input condition check
  const isFormValid = name.trim().length >= 5;

  const paperStyle = {
    padding: "2.45rem 3.5375rem",
    height: "440px",
    width: "430px",
    // border: "1px solid rgba(217, 217, 217, 0.4)",
    border: "1px solid rgba(217, 217, 217, 0.4)",
    borderRadius: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    position: "relative",
    background: "#fff",
  };

  return (
    <Wrapper>
      <Grid2 container justifyContent="center">
        <Paper style={paperStyle}>
          {/* Header Grid2 */}
          <Grid2
            align="center"
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Grid2 item>
              <Avatar src={logo} style={{ height: "55px", width: "58px" }} />
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
                  letterSpacing: "-1",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Start creating your account
              </Typography>
            </Grid2>
          </Grid2>
          {/* Profile section Grid2 */}
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <Avatar
              src={uploadedImage || profile}
              style={{ height: "80px", width: "80px", objectFit: "cover" }}
            />
            <Button
              onClick={handleButtonClick}
              style={{
                border: "1px solid rgba(217, 217, 217, 0.4)",
                width: "165px",
                height: "40px",
                gap: "10px",
                display: "flex",
                flexDirection: "row",
                lineHeight: "16.63px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={upload} alt="upload icon" />
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
            />
          </Grid2>
          {/* Submit button Grid2 */}
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
          {/* Decorative Blur Effect */}
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
              opacity: 0.7,
              zIndex: -3,
            }}
          ></div>
        </Paper>
      </Grid2>
    </Wrapper>
  );
}

export default AccountCreationHeader;
