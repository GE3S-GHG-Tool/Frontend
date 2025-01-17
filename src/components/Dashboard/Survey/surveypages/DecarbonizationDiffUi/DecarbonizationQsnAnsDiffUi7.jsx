import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import smoke from "../../../../../assets/images/smoke.svg";
import Tooltip from "@mui/material/Tooltip";
import info_icon from "../../../../../assets/images/info_icon.svg";
function DecarbonizationQsnAnsDiffUi7({ answer }) {
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
            boxShadow: "none",
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
            <Typography fontSize="16px" fontWeight="600" color="#000">
              Programmable thermostats and CO2 Sensors for HVAC system
            </Typography>
            <Tooltip title="Dummy Text" placement="top" arrow>
              {info_icon && <img src={info_icon} alt="logo" width="16px" />}
            </Tooltip>
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
            <Typography fontSize="0.875rem" fontWeight="normal" color="#000">
              Have you considered incorporating the necessary strategies into
              the HVAC system design to ensure efficient control and operation
              of the units?
            </Typography>
          </Grid2>

          {answer.answer === "No" ? (
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
                }}
              >
                <Typography fontSize="0.85rem" fontWeight="400">
                  <ol style={{ padding: "5px 20px 5px 40px" }}>
                    <li style={{ lineHeight: "1.5rem" }}>
                      Zoning strategies is applied for the entire HVAC
                      controlled area. Zones in the industrial facility or
                      warehouse should be created keeping in mind various
                      factors such as individual temperature preferences, window
                      size and direction of sunlight, flooring, and purpose of
                      the area (workshop/kitchen/gym/office / process area).
                      Provide the CO2 in the breathing zone of occupied space.
                      Sensors should be placed 4-6 Feet above the floor. All
                      thermostats linked to air conditioning or comfort cooling
                      systems should be fitted with a programmable thermostat
                      which at the basic level provides on/off controls (timer
                      controls) at a minimum level. Temperature control
                      functionality is encouraged as it provides additional
                      savings. The control should be simple and capable of
                      operating independently without the need for BMS or any
                      advanced integrations. The programmable thermostats shall
                      be fixed on an interior wall, that shall not be affected
                      by heating/ cooling diffusers or other openings like
                      doors, windows, skylight, direct sunlight or bright lamp
                      which may potentially influence their functioning.
                    </li>
                  </ol>
                </Typography>
              </Grid2>
            </Grid2>
          ) : (
            <div style={{ paddingBottom: "10px" }}></div>
          )}
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsDiffUi7;
