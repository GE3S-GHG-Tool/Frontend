import React from "react";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import meeterBolt from '../../../../../assets/images/meter-bolt 1.svg'
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../../assets/images/info_icon.svg";

function DecarbonizationQsnAnsWithUi3() {
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
            <img src={meeterBolt} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
            >
              Envelope Tightness (Performance-based) Blower Door Test Technique
            </Typography><Tooltip title="Dummy Text" placement="top" arrow>{info_icon && <img src={info_icon} alt="logo" width="16px" />}</Tooltip>
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
              Has the industrial facility/warehouse been assessed for envelope
              airtightness, and have <br /> measures been taken to identify and
              address any defects or leakages?
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
                Implementation team / contractor is accountable for the
                following tasks:
                <br />
                <br />
                Set up the blower door.
                <br />
                <ul>
                  <li>Make ready the building for the Pre blower door test.</li>
                  <li>Perform the blower door test.</li>
                  <li>Record the results on performance testing form</li>
                  <li>
                    Report the results and fill the leaks to ensure that the air
                    leakage does not exceed the prescribed limit.
                  </li>
                </ul>
              </Typography>
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                These tests need to be conducted with the use of a blower door
                to measure the amount of leakage of an object. If required these
                tests can be extended to use the techniques such as thermography
                and smoke simulations to locate any excessive leakages. The air
                leakage is contained within a maximum of 10 m3/hr/m2 @ 50
                Pascal.
                <br />
                Estidama guideline prescribed in PBRS Version 1 or updated
                guideline.
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUi3;
