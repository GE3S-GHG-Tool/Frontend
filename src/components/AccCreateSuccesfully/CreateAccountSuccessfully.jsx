import Wrapper from "../Wrapper/Wrapper";
import { Grid2, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
function CreateAccountSuccessfully() {
  const paperStyle = {
    height: "210px",
    padding: "60px 60px 60px 60px", // Updated padding
    maxWidth: "100%",
    width: "350px",
    border: "1px solid rgba(217, 217, 217, 0.4)",
    borderRadius: "16px",
    boxShadow: "6px 89px 56px -38px rgba(89, 132, 131, 0.65)",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
      <Wrapper>
        <Grid2 container justifyContent="center">
          <Paper style={paperStyle}>
            <Grid2 style={{ position: "absolute", top: "23px", right: "25px" }}>
              <Link to="/login">
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                  <g id="X">
                    <path
                      id="Vector"
                      d="M25.7081 24.2925C25.801 24.3854 25.8747 24.4957 25.9249 24.6171C25.9752 24.7385 26.0011 24.8686 26.0011 25C26.0011 25.1314 25.9752 25.2615 25.9249 25.3829C25.8747 25.5043 25.801 25.6146 25.7081 25.7075C25.6151 25.8004 25.5048 25.8741 25.3835 25.9244C25.2621 25.9747 25.132 26.0006 25.0006 26.0006C24.8692 26.0006 24.7391 25.9747 24.6177 25.9244C24.4963 25.8741 24.386 25.8004 24.2931 25.7075L16.0006 17.4138L7.70806 25.7075C7.52042 25.8951 7.26592 26.0006 7.00056 26.0006C6.73519 26.0006 6.4807 25.8951 6.29306 25.7075C6.10542 25.5199 6 25.2654 6 25C6 24.7346 6.10542 24.4801 6.29306 24.2925L14.5868 16L6.29306 7.70751C6.10542 7.51987 6 7.26537 6 7.00001C6 6.73464 6.10542 6.48015 6.29306 6.29251C6.4807 6.10487 6.73519 5.99945 7.00056 5.99945C7.26592 5.99945 7.52042 6.10487 7.70806 6.29251L16.0006 14.5863L24.2931 6.29251C24.4807 6.10487 24.7352 5.99945 25.0006 5.99945C25.2659 5.99945 25.5204 6.10487 25.7081 6.29251C25.8957 6.48015 26.0011 6.73464 26.0011 7.00001C26.0011 7.26537 25.8957 7.51987 25.7081 7.70751L17.4143 16L25.7081 24.2925Z"
                      fill="black"
                    />
                  </g>
                </svg>
              </Link>
            </Grid2>
            <Grid2
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
              style={{ marginTop: "12px" }}
            >
              {" "}
              <svg width="80" height="95" viewBox="0 0 113 113" fill="none">
                <circle
                  cx="56.5"
                  cy="56.5"
                  r="56"
                  fill="url(#paint0_linear_939_5057)"
                />
                <path
                  d="M34.0957 56.3002L49.0854 71.29L78.9071 41.4683"
                  stroke="white"
                  strokeWidth="8.83606"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_939_5057"
                    x1="0.5"
                    y1="0.5"
                    x2="130.171"
                    y2="27.4392"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#51ADAC" />
                    <stop offset="1" stopColor="#4FA874" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                style={{
                  color: "#000000", // Ensure the correct color value as per design
                  fontFamily: "Inter", // Set the font family to Inter
                  fontSize: "20px", // Adjusted to match the Figma font size
                  fontWeight: 500, // Changed to match the Figma font weight
                  lineHeight: "36px", // Set line height as per Figma design
                  textAlign: "center", // Center align the text
                  letterSpacing: "-0.02em", // Adjust letter spacing as specified
                  whiteSpace: "nowrap", // Keep text on one line
                  overflow: "hidden", // Hide overflow content
                  textOverflow: "ellipsis", // Add ellipsis if the text overflows
                }}
              >
                Your account has been created successfully
              </Typography>
              <Link to="/generate-reports">
                <Button
                  sx={{
                    width: "210px",
                    borderRadius: "32px",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "500",
                    fontSize: "22px",
                    color: "#51ADAC",
                    height: "48px",
                    textTransform: "capitalize",
                    lineHeight: "33px",
                    padding: "10px 20px 10px 20px", // Adjust padding if needed
                    border: "1px solid #369D9C",
                    marginTop: "8px",
                  }}
                >
                  Continue
                </Button>
              </Link>
            </Grid2>
          </Paper>
        </Grid2>
      </Wrapper>
    </div>
  );
}

export default CreateAccountSuccessfully;
