import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import survey from '../../../../assets/images/survey_page.png';
import DecarbonizationSurveyQsn from "../surveypages/DecarbonizationSurveyQsn";
import CustomModal from "../../CustomModal/CustomModal";

const StyledContainer = {
  width: '90%',
  border: '0.777px solid #369D9C',
  borderRadius: '18.675px',
  background: '#F6FFF9',
  padding: '3.4rem'
};


const Survey = () => {

  const [surveyStarted, setSurveyStarted] = useState(false);
  const [open, setOpen]=useState(false)

  const handleStartSurvey = () => {
    setSurveyStarted(true);
  };
  return (
    <>
      <div>
        {!surveyStarted ?
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85vh' }}>
            <div style={StyledContainer}>
              <div style={{
                textAlign: "center",
                borderRadius: "18.65px",
                width: "90%",
                gap: "1rem",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto',
                background: '#F6FFF9',
                padding: '3rem 0'
              }}>
                <img
                  src={survey}
                  alt="Decarbonization Survey"
                  style={{ marginBottom: "16px", width: "200px" }}
                />
                <div>
                  <Typography gutterBottom style={{ fontSize: "1.2rem", fontWeight: '600', color: 'black' }}>
                    Benefits of the Decarbonization Survey
                  </Typography>
                  <p style={{ color: '#717171', fontWeight: 'normal', fontSize: '0.875rem', margin: "0.5rem 0" }}>
                    Our Decarbonization Survey identifies high emission sources and offers
                    tailored reduction strategies.Improve your environmental
                  </p>
                  <p style={{ color: '#717171', fontWeight: 'normal', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                    impact,
                    enhance compliance, boost efficiency, save costs, and strengthen your
                    brand's sustainability and reputation.
                  </p>
                </div>

                <Button
                  sx={{
                    backgroundColor: '#369D9C',
                    textTransform: 'none',
                    borderRadius: '32px',
                    padding: '0.7rem 2rem',
                    fontSize: '0.75rem',
                    background:
                      "var(--grad-3, linear-gradient(102deg, #369D9C 0%, #28814D 100%))",
                    '&:hover': {
                      background:
                        "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
                    },

                  }}
                  onClick={handleStartSurvey}
                >
                  <Typography color="#fff" fontSize="12px">
                    Start Survey
                  </Typography>
                </Button>
              </div>
            </div>
          </div> : (
            <DecarbonizationSurveyQsn />
          )

        }

      </div>
      <CustomModal />
    </>
  );
};

export default Survey;
