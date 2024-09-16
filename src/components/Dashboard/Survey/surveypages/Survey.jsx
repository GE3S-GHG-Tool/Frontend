// import React, { useState } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { styled } from "@mui/system";
// import survey from '../../assets/images/survey.png'
// import CustomModal from "./CustomModal/customModal";

// const StyledContainer = {
//   width: '90%',
//   border: '0.777px solid #369D9C',
//   borderRadius: '18.675px',

//   background: '#F6FFF9',
//   padding: '3.4rem'
// };

// const SurveyCard = styled(Box)(({ theme }) => ({
//   textAlign: "center",
//   borderRadius: "18.65px",
//   width: "90%",
//   gap: "1rem",
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   margin: '0 auto',
//   background: '#F6FFF9',
// }));

// const Survey = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);
//   const handleAddFacility = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <div style={StyledContainer}>
//         <SurveyCard>
//           <img
//             src={survey}
//             alt="Decarbonization Survey"
//             style={{ marginBottom: "16px", width: "200px" }}
//           />
//           <Typography gutterBottom style={{ fontSize: "1.5rem", fontWeight: '600', color: 'black' }}>
//             Benefits of the Decarbonization Survey
//           </Typography>
//           <Typography variant="body1" sx={{
//             width: '60%', margin: '0 auto', fontSize: '1rem', fontWeight: '400', color: '#717171'
//           }}>
//             Our Decarbonization Survey identifies high emission sources and offers
//             tailored reduction strategies. Improve your environmental impact,
//             enhance compliance, boost efficiency, save costs, and strengthen your
//             brand's sustainability and reputation.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#369D9C',
//               textTransform: 'none',
//               borderRadius: '32px',
//               padding: '0.6rem 2rem',
//               fontSize:'0.7rem',
//               background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
//               '&:hover': { background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)", },
//             }}
//             onClick={handleOpenModal}
//           >
//             Start Survey
//           </Button>
//         </SurveyCard>
//       </div>
//     </div>
//       <CustomModal
//         open={isModalOpen}
//         onClose={handleCloseModal}
//         title="Subscribe to addon plan for survey access."
//         description="Invite member"
//         actionText="Get Started"
//         onAction={handleAddFacility}
//         price={20}
//         type="survey"
//         planContains="Invite more members"
//       />
//     </>
//   );
// };

// export default Survey;

import React, { useState } from "react";
import { Button, Grid2, Paper, Typography } from "@mui/material";
import customer_Logo from "../../../../assets/images/CustomerSurveyLogo.svg";
import DecarbonizationSurveyQsn from "../surveypages/DecarbonizationSurveyQsn";

function Survey() {
  const [surveyStarted, setSurveyStarted] = useState(false);

  const handleStartSurvey = () => {
    setSurveyStarted(true);
  };

  const paperStyle = {
    height: "420px",
    backgroundColor: "#F6FFF9",
    maxWidth: "100%",
    width: "950px",
    borderRadius: "12.65px",
    display: "flex",
    textAlign: "center",
    border: "0.777px solid var(--G-2, #369D9C)",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35px",
  };

  return (
    <div>
      {!surveyStarted ? (
        <Grid2 container justifyContent="center">
          <Paper style={paperStyle}>
            <Grid2
              sx={{
                width: "190px",
                height: "190px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
                mb: "35px",
              }}
            >
              <img
                src={customer_Logo}
                alt="customer_logo"
                height="200px"
                width="200px"
              />
            </Grid2>
            <Grid2 sx={{ width: "100%", position: "absolute" }}>
              <Typography
                variant="h1"
                fontSize="18px"
                fontWeight="600"
                mt="110px"
              >
                Benefits of the Decarbonization Survey
              </Typography>
            </Grid2>
            <Grid2 sx={{ width: "85%" }}>
              <Typography
                variant="h1"
                fontSize="10.5px"
                fontWeight="400"
                fontStyle="normal"
                lineHeight="220%"
                color="var(--Grey-1, #717171)"
                mt="6px"
              >
                Our Decarbonization Survey identifies high emission sources and
                offers tailored reduction strategies. Improve your environmental
                impact, enhance compliance, boost efficiency, save costs, and
                strengthen your brand's sustainability and reputation.
              </Typography>
              <Button
                sx={{
                  background:
                    "var(--grad-3, linear-gradient(102deg, #369D9C 0%, #28814D 100%))",
                  color: "#ffffff",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 26px",
                  borderRadius: "32px",
                  mt: "10px",
                }}
                onClick={handleStartSurvey}
              >
                <Typography fontSize="10px" textTransform="capitalize">
                  Start Survey
                </Typography>
              </Button>
            </Grid2>
          </Paper>
        </Grid2>
      ) : (
        <DecarbonizationSurveyQsn />
      )}
    </div>
  );
}

export default Survey;
