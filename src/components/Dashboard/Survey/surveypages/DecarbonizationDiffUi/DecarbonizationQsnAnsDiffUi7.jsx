import React from "react";
import IndustryTable from "../TablesDataDecarbonation4";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import smoke from "../../../../../assets/images/smoke.svg"

function DecarbonizationQsnAnsDiffUi7() {
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
            <img src={smoke} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
              width="600px"
            >
              Installation of Energy Recovery Units and regulated air intake
              system
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
              Have you considered incorporating design strategies to utilize
              Energy Recovery Units <br />
              (ERUs) in the plant?
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
                sx={{ padding: "6px 0", width: "1050px" }}
              >
                1. Zoning strategies is applied for the entire HVAC controlled
                area. Zones in the industrial facility or warehouse should be
                created keeping in mind various factors such as individual
                temperature preferences, window size and direction of sunlight,
                flooring, and purpose of the area (workshop/kitchen/gym/office /
                process area). Provide the CO2 in the breathing zone of occupied
                space. Sensors should be placed 4-6 Feet above the floor. All
                thermostats linked to air conditioning or comfort cooling
                systems should be fitted with a programmable thermostat which at
                the basic level provides on/off controls (timer controls) at a
                minimum level. Temperature control functionality is encouraged
                as it provides additional savings. The control should be simple
                and capable of operating independently without the need for BMS
                or any advanced integrations. The programmable thermostats shall
                be fixed on an interior wall, that shall not be affected by
                heating/ cooling diffusers or other openings like doors,
                windows, skylight, direct sunlight or bright lamp which may
                potentially influence their functioning.
                <br />
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsDiffUi7;
