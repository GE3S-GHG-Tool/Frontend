import React from "react";
import IndustryTable from "../TablesDataDecarbonation4";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import snow_blowing from "../../../../../assets/images/snow-blowing.svg";
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../../assets/images/info_icon.svg";

function DecarbonizationQsnAnsWithUl2() {
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
            <img src={snow_blowing} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
            >
              Envelope Tightness for Air-Conditioned Spaces - Thermal Imaging
              Technique
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
              <Typography color="#5B5B5B" fontSize="0.875rem" fontWeight="400">
                Q.1
              </Typography>
            </Box>
            <Typography fontSize="0.875rem" fontWeight="normal" color="#000">
              Has interior thermal imaging been conducted for
              air-conditioned/climate-controlled spaces to identify potential
              building defects?
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              padding: "20px 20px 0 20px",
              borderRadius: "5px",
              // borderBottom: "1px solid #E4E4E4",
            }}
          >
            <Grid2
              sx={{
                border: "1px solid #D9D9D9",
                background: "#F7FFFC",
                borderRadius: "5px",
              }}
            >
              <Typography
                fontSize="0.85rem"
                fontWeight="400"
              >
                <ol>
                  <li>
                    Thermal imaging carried out by a qualified thermographer.
                  </li>
                </ol>
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
                <Typography color="#5B5B5B" fontSize="0.875rem" fontWeight="400">
                  Q.2.1
                </Typography>
              </Box>
              <Typography fontSize="0.875rem" fontWeight="normal" color="#000">
              If leaks or gaps were identified, have appropriate corrective actions been taken to address them?
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
              <Typography fontSize="14px" fontWeight="normal" color="#000">
                Have the tests and reports been conducted in compliance with the
                specified conditions?
              </Typography>
            </Grid2>
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
                display: "flex",
                flexDirection: "column",
                padding:'15px'
              }}
            >
              <Typography
                sx={{ fontSize: "0.85rem", ml: "4px", mt: "8px", fontWeight: 400 }}
              >
                The thermography report highlighting
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 400 }}>
                <ul>
                  <li style={{ lineHeight: '1.5rem' }}>The defects in the building envelope</li>
                  <li style={{ lineHeight: '1.5rem' }}>The leakage spots noticed in the space and.</li>
                  <li style={{ lineHeight: '1.5rem' }}>Recommendations for rectifications</li>
                </ul>
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUl2;
