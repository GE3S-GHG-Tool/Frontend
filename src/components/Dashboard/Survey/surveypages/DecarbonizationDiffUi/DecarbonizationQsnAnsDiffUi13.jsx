import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import sonalPanel from "../../../../../assets/images/solar-panel 1.svg"
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../../assets/images/info_icon.svg";

function DecarbonizationQsnAnsWithUi13() {
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
            boxShadow:'none'
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
            <img src={sonalPanel} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
            >
              Onsite Renewable Energy Generation
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
              Have you considered conducting a feasibility study to explore the
              potential of generating renewable power on-site?
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
                  padding: "4px 0", // Padding for spacing
                  marginBottom: "4px", // Margin for spacing
                  display: "flex", // Use flex for alignment
                  alignItems: "flex-start", // Align items to the start
                }}
              >
                <span>1.</span>
                <span>
                  Renewable energy system shall be utilized to generate power
                  and cater to select loads of the development such as
                  ventilation load, external security lighting loads, security
                  lamps and any other lighting requirements specific to the
                  project.
                </span>
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUi13;
