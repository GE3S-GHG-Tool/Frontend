import React from "react";
import IndustryTable from "../TablesDataDecarbonation4";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import snow_blowing from "../../../../../assets/images/snow-blowing.svg";

function DecarbonizationQsnAnsWithUl2() {
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
            <img src={snow_blowing} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
              width="600px"
            >
              Envelope Tightness for Air-Conditioned Spaces - Thermal Imaging
              Technique
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
              Has interior thermal imaging been conducted for
              air-conditioned/climate-controlled spaces to identify potential
              building defects?
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              mt: "15px",
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
                mt: "15px",
              }}
            >
              <Typography
                fontSize="13px"
                fontWeight="600"
                sx={{ padding: "6px 0" }}
              >
                1.Thermal imaging carried out by a qualified thermographer.
              </Typography>
            </Grid2>

            <Grid2
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
                mt: "15px",
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
                  Q.2.1
                </Typography>
              </Box>
              <Typography fontSize="14px" fontWeight="500" color="#000">
                Has interior thermal imaging been conducted for
                air-conditioned/climate-controlled spaces to identify potential
                building defects?
              </Typography>
            </Grid2>

            <Grid2
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "12px",
                mt: "15px",
                mb: "15px",
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
                  Q.2.2
                </Typography>
              </Box>
              <Typography fontSize="14px" fontWeight="500" color="#000">
                Have the tests and reports been conducted in compliance with the
                specified conditions?
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2
            sx={{
              border: "1px solid var(--Grey-3, #D9D9D9)",
              background: "#F7FFFC",
              borderRadius: "5px",
              padding: "1px 12px",
              mt: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "98%",
              mb: "18px",
              ml: "15px",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", ml: "4px", mt: "10px", fontWeight: 600 }}
            >
              The thermography report highlighting
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              <ul>
                <li>The defects in the building envelope</li>
                <li>The leakage spots noticed in the space and.</li>
                <li>Recommendations for rectifications</li>
              </ul>
            </Typography>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUl2;