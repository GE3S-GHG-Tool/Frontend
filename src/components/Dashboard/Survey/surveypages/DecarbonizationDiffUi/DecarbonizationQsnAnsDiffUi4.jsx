import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import calculator from '../../../../../assets/images/calculator-bill 1.svg'

function DecarbonizationQsnAnsWithUi4() {
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
            <img src={calculator} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
              width="600px"
            >
              Optimal System Sizing - HVAC
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
              Have you evaluated the potential impact of different HVAC systems
              on energy efficiency and operating costs to inform your selection?
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              mt: "8px",
              ml: "0px",
              padding: "10px 19px",
              borderRadius: "5px",
              borderBottom: "1px solid #E4E4E4",
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
                1. Zoning the condition area
                <br />
              </Typography>
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                2. Perform the Heat load calculations
                <br />
              </Typography>
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                3. Select the Air- Conditioning equipment
                <br />
              </Typography>
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                4. Design consideration of heat recovery units. Ventilation
                calculation should be carried out and the results of such
                calculations should be used for sizing the fresh air systems,
                exhaust systems and Energy Recovery Units etc.
                <br />
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUi4;
