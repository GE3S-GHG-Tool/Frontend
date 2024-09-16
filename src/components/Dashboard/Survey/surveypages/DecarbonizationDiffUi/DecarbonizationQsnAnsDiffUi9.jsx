import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import insight from '../../../../../assets/images/insight.svg'

function DecarbonizationQsnAnsWithUi9() {
  return (
    <div>
      <Grid2
        sx={{
          flexDirection: "column",
          display: "flex",
          border: "1px solid #E4E4E4",
          borderRadius: "5px",
          borderTop: "3px solid #369D9C",
          gap: "20px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              mt: "16px",
              ml: "16px",
              alignItems: "center",
            }}
          >
            <img src={insight} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
              width="600px"
            >
              Automated lighting control / motion sensor for internal lighting
            </Typography>
          </Grid2>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              ml: "15px",
            }}
          >
            <Box
              sx={{
                width: "37px",
                height: "34px",
                backgroundColor: "#F7F7F7",
                padding: "7px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="#5B5B5B" fontSize="14px" fontWeight="400">
                Q.1
              </Typography>
            </Box>
            <Typography fontSize="14px" fontWeight="500" color="#000">
              Have you considered selecting internal lighting systems that offer
              flexible control options
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              mt: "8px",
              mb: "8px",
              ml: "0px",
              padding: "10px 19px",
              borderRadius: "5px",
            }}
          >
            <Grid2
              sx={{
                border: "1px solid var(--Grey-3, #D9D9D9)",
                background: "#F7FFFC",
                borderRadius: "5px",
                padding: "1px 12px",
              }}
            >
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                1. Installation of occupancy sensors/motion sensors for
                automated control of internal lighting.
                <br />
                <br />
                The Occupancy sensors after due consideration shall be provided
                for the following areas within the facility
                <ul>
                  <li>Areas within the industry if relevant and appropriate</li>
                  <li>Workshop area</li>
                  <li>Pedestrian pathway</li>
                  <li>Pantry</li>
                  <li>Prayer room.</li>
                  <li>Corridor / passage.</li>
                  <li>Ablution</li>
                  <li>Other areas if found suitable</li>
                </ul>
              </Typography>
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                Exceptions: Process area / Machine area
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUi9;
