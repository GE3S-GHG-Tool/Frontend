import React from "react";
import IndustryTable from "../TablesDataDecarbonation4";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import snowSnake from '../../../../../assets/images/snowflakes.svg'
import TablesDataDecarbonation3 from "../TablesDataDecarbonation3";
import Tooltip from '@mui/material/Tooltip';
import info_icon from "../../../../../assets/images/info_icon.svg";

function DecarbonizationQsnAnsDiffWIthUi6() {
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
            <img src={snowSnake} alt="lg" />
            <Typography
              fontSize="16px"
              fontWeight="600"
              color="#000"
            >
              Selection of Cooling Equipment with High Energy Efficiency Ratio
              (EER)
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
              Have you confirmed that the energy-efficient cooling equipment to
              be procured and <br />
              installed is consistent with the capacities specified in the
              "Optimal System Sizing - HVAC <br />
              section?
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
                1. All Air Conditioning units should meet the Minimum Energy
                Efficiency Ratio (EER) as mentioned in Table- (table attached in
                the next cell)
                <br />
              </Typography>
            </Grid2>
            <Grid2 sx={{ mt: "10px" }}>
              <TablesDataDecarbonation3></TablesDataDecarbonation3>
            </Grid2>
          </Grid2>
          <Grid2></Grid2>
        </Paper>
      </Grid2>
    </div>
  );
}

export default DecarbonizationQsnAnsDiffWIthUi6;
