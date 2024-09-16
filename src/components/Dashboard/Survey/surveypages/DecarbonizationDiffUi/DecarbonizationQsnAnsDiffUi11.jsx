import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import lightBulbSetting from "../../../../../assets/images/lightbulb-setting.svg"

function DecarbonizationQsnAnsWithUi11() {
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
            <img src={lightBulbSetting} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
              width="600px"
            >
              Control of External lights
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
              Have you confirmed that the external lighting systems incorporate
              strategies to switch on/off based on specific needs or timings?
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              mt: "8px",
              mb: "8px",
              ml: "0px",
              padding: "8px 16px", // Equal space around the grid
              borderRadius: "5px",
            }}
          >
            <Grid2
              sx={{
                border: "1px solid var(--Grey-3, #D9D9D9)",
                background: "#F7FFFC",
                borderRadius: "5px",
                padding: "10px 12px",
              }}
            >
              <Typography
                fontSize="14px" // Unified font size
                fontWeight="600" // Unified font weight
                sx={{
                  padding: "4px 0", // Reduced padding for closer alignment
                  marginBottom: "4px", // Reduced margin for closer alignment with list
                }}
              >
                1. Switching external lighting (or specific circuits of the
                lighting system as per the project needs) by any of the
                following ways:
              </Typography>
              <ul
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  paddingLeft: "18px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <li>
                  Daylight sensors (for precise switching and control of lights
                  based on daylight availability).
                </li>
                <li>
                  Control motion control devices, occupancy sensors (if relevant
                  to the project).
                </li>
                <li>Timer control for operation at pre-set times.</li>
              </ul>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUi11;
