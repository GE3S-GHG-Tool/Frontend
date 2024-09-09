import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  borderRadius: "18.65px 0px 0px 0px",
  borderWidth: "0.78px",
  backgroundColor: "#E8F5E9",
  paddingTop: "56px",
  gap: "6.22px",
  padding: theme.spacing(2),
}));

const SurveyCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  backgroundColor: "#FFFFFF",
  borderRadius: "18.65px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "800px",
  width: "100%",
}));

const StyledButton = styled(Button)({
  background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
  borderRadius: "25px",
  padding: "10px 24px",
  color: "#fff",
  marginTop: "16px",
  "&:hover": {
    background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
  },
});

const Survey = () => {
  return (
    <StyledContainer maxWidth="lg">
      <SurveyCard>
        <img
          src="your-image-url-here"
          alt="Decarbonization Survey"
          style={{ marginBottom: "16px", width: "200px" }}
        />
        <Typography variant="h5" gutterBottom>
          Benefits of the Decarbonization Survey
        </Typography>
        <Typography variant="body1" paragraph>
          Our Decarbonization Survey identifies high emission sources and offers
          tailored reduction strategies. Improve your environmental impact,
          enhance compliance, boost efficiency, save costs, and strengthen your
          brand's sustainability and reputation.
        </Typography>
        <StyledButton variant="contained">Start Survey</StyledButton>
      </SurveyCard>
    </StyledContainer>
  );
};

export default Survey;
