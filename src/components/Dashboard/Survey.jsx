import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import survey from '../../assets/images/survey.png'
import CustomModal from "./CustomModal/customModal";

const StyledContainer = {
  width: '90%',
  border: '0.777px solid #369D9C',
  borderRadius: '18.675px',

  background: '#F6FFF9',
  padding: '3.4rem'
};

const SurveyCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "18.65px",
  width: "90%",
  gap: "1rem",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  background: '#F6FFF9',
}));

const Survey = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddFacility = () => {
    setIsModalOpen(false);
  };

  return (
    <>    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={StyledContainer}>
        <SurveyCard>
          <img
            src={survey}
            alt="Decarbonization Survey"
            style={{ marginBottom: "16px", width: "200px" }}
          />
          <Typography gutterBottom style={{ fontSize: "1.5rem", fontWeight: '600', color: 'black' }}>
            Benefits of the Decarbonization Survey
          </Typography>
          <Typography variant="body1" sx={{
            width: '60%', margin: '0 auto', fontSize: '1rem', fontWeight: '400', color: '#717171'
          }}>
            Our Decarbonization Survey identifies high emission sources and offers
            tailored reduction strategies. Improve your environmental impact,
            enhance compliance, boost efficiency, save costs, and strengthen your
            brand's sustainability and reputation.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#369D9C',
              textTransform: 'none',
              borderRadius: '32px',
              padding: '0.6rem 2.4rem',
              background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
              '&:hover': { background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)", },
            }}
            onClick={handleOpenModal}
          >
            Start Survey
          </Button>
        </SurveyCard>
      </div>
    </div>
      <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Subscribe to addon plan for survey access."
        description="Invite member"
        actionText="Get Started"
        onAction={handleAddFacility}
        price={20}
        type="survey"
        planContains="Invite more members"
      />
    </>
  );
};

export default Survey;
