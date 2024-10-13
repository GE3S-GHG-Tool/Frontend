import React from "react";
import IndustryTable from "../TablesDataDecarbonation4";
import { Grid2, Paper, Typography, Box } from "@mui/material";
import handHolding from "../../../../../assets/images/hand-holding-water 1.svg";
import Tooltip from "@mui/material/Tooltip";
import info_icon from "../../../../../assets/images/info_icon.svg";

function DecarbonizationQsnAnsWithUi5({ answer }) {
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
            <img src={handHolding} alt="lg" />
            <Typography fontSize="16px" fontWeight="600" color="#000">
              Installation of Energy Recovery Units and regulated air intake
              system
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
              Have you considered incorporating design strategies to utilize
              Energy Recovery Units (ERUs) in the plant?
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
                <Typography
                  fontSize="0.85rem"
                  fontWeight="400"
                  position="relative"
                >
                  <span
                    style={{ position: "absolute", top: "5px", left: "15px" }}
                  >
                    Energy Recovery Systems (ERV) should be used in all combined
                    supply & extract air handling units where applicable and
                    found practical in terms of
                  </span>
                  <ol style={{ padding: "30px 20px 5px 40px" }}>
                    <li style={{ lineHeight: "1.5rem" }}>
                      Quantity of air extracted.
                    </li>
                    <li style={{ lineHeight: "1.5rem" }}>
                      Availability of ERV systems for that capacity.
                    </li>
                    <li style={{ lineHeight: "1.5rem" }}>
                      Assessment of the benefits.
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

export default DecarbonizationQsnAnsWithUi5;
