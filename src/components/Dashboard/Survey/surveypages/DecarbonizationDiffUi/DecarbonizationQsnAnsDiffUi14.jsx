import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import lightCelling from "../../../../../assets/images/light-ceiling 1.svg"
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../../assets/images/info_icon.svg";
function DecarbonizationQsnAnsWithUi14() {
  return (
    <div>
      <Grid2
        sx={{
          flexDirection: "column",
          display: "flex",
          border: "1px solid #E4E4E4",
          borderRadius: "5px",
          borderTop: "5px solid #369D9C",
          gap: "20px",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            boxShadow: 'none'
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
            <img src={lightCelling} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
            >
              General Plant Lighting - Use of Solar Daylighting Technologies
            </Typography>
            <Tooltip title="Dummy Text" placement="top" arrow>{info_icon && <img src={info_icon} alt="logo" width="16px" />}</Tooltip>
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
            <Typography fontSize="14px" fontWeight="normal" color="#000">
              Have you explored the possibility of incorporating daylighting
              technologies into the industrial design?
            </Typography>
          </Grid2>
          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              padding: "20px",
              borderRadius: "5px",
              borderBottom: "1px solid #E4E4E4",
            }}
          >
            <Grid2
              sx={{
                border: "1px solid #D9D9D9",
                background: "#F7FFFC",
                borderRadius: "5px",
                padding: '25px'
              }}
            >
              <Typography
                fontSize="0.85rem"
                fontWeight="400"
              >
                1. The design should seek to embrace a judicial mix of solar
                daylighting systems i.e. systems/technologies and Architecture
                manifested in one of the following ways
                <ul>
                  <li>Daylight optimized building footprint</li>
                  <li>Skylights (Passive or Active)</li>
                  <li>Tubular daylighting devices </li>
                  <li>Daylight redirection devices </li>
                  <li>Solar Exterior shading and control devices.</li>
                  <li>The reflectance of room surfaces"</li>
                </ul>
              </Typography>
             
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUi14;
