import React from "react";
import IndustryTable from "../TablesDataDecarbonation4";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import handHolding from "../../../../../assets/images/hand-holding-seeding.svg";
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../../assets/images/info_icon.svg";
function DecarbonizationQsnAnsWithUl() {
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
            <img src={handHolding} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
            >
              Energy Conservation Techniques and Thermal Insulation
              (Applicable for both Air-conditioned and Non-Air-Conditioned
              buildings)
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
            <Typography fontSize="0.875rem" fontWeight="normal" color="#000">
              Has the development team considered improving the energy
              efficiency of the building's envelope?
            </Typography>
          </Grid2>
          <Grid2
            sx={{
              borderTop: "1px solid #E4E4E4",
              padding: "20px",
              borderRadius: "5px",
              // borderBottom: "1px solid #E4E4E4",
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
                1. Make Sure that the development team considers the improvement
                in the energy efficiency of the building's envelope.
                <br />
                <br />
                The envelope addresses the following
                <ul>
                  <li>Horizontal Opaque elements - Roof, Slabs</li>
                  <li>Vertical Opaque element – Wall, door.</li>
                  <li>Horizontal Glazing – Sky light.</li>
                  <li>
                    Vertical Glazing – Glass Door, windows.
                  </li>
                </ul>
              </Typography>
              <Typography
                fontSize="0.85rem"
                fontWeight="400"
              >
                Rest other buildings in the industries, e.g. Admin and office
                building shall adhere to mandatory
                <br />
                Estidama guideline prescribed in PBRS Version 1 or updated
                guideline.
              </Typography>
            </Grid2>
          </Grid2>

          {/* Conditional Rendering of Table */}
          <Grid2
            sx={{
              mb: "8px",
              ml: "0px",
              padding: "10px 19px",
              borderRadius: "5px",
            }}
          >
            <IndustryTable></IndustryTable>
          </Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsWithUl;
