// ProcessEmissionReports.js
import React, { useState } from "react";
import {
  DialogContent,
  Button,
  Typography,
  TextField,
  Grid2,
} from "@mui/material";
import emisson_logo from "../../../../assets/images/emisson_logo.svg";
import x_logo from "../../../../assets/images/X_logo.svg";
import Gas2PopupEmission from "./Gas2PopupEmission";
import Gas1PopupEmisson from "./Gas1PopupEmisson";

function ProcessEmissionReports({ onClose }) {
  return (
    <div>
      <Grid2
        sx={{
          padding: "30px 35px 30px 35px",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "16px",
          position: "relative",
        }}
      >
        <DialogContent
          sx={{
            maxHeight: "490px", // Set a maximum height for the popup content
            overflowY: "auto", // Add vertical scroll if content overflows
            padding: 0, // Adjust padding if needed
            height: "550px",
          }}
        >
          <Grid2
            sx={{
              width: "98%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  width: "100%",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <img
                    src={emisson_logo}
                    height="15px"
                    width="10px"
                    alt="fuel-logo"
                  />
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "28px",
                      color: "#000000",
                      margin: 0,
                    }}
                  >
                    Process Emission
                  </h2>
                </div>
                <img
                  src={x_logo}
                  onClick={onClose}
                  alt="dot-icon"
                  height="24px"
                  width="24px"
                  style={{
                    marginBottom: "30px",
                    marginRight: "25px",
                    position: "absolute",
                    right: "0",
                    cursor: "pointer",
                  }}
                />
              </div>
              <Typography
                fontSize="12px"
                fontWeight="400"
                lineHeight="22.4px"
                color="#717171"
              >
                Record the type of industrial process and the quantity of
                product processed to calculate emissions directly related to
                production activities.
              </Typography>
            </Grid2>
            {/* gas1 */}
            <Gas1PopupEmisson></Gas1PopupEmisson>
            {/* gas2 */}
            <Gas2PopupEmission></Gas2PopupEmission>
          </Grid2>
          {/* single */}
          <Grid2
            sx={{
              border: "1px solid var(--stroke-21, rgba(217, 217, 217, 0.40));",
              flexDirection: "column",
              display: "flex",
              padding: "18px",
              borderRadius: "8px",
              mt: "20px",
              width: "98%",
            }}
          >
            <Typography
              variant="body2"
              fontSize="12px"
              fontWeight="400"
              lineHeight="19.6px"
            >
              Quantity of gas production (m3)
            </Typography>
            <TextField
              placeholder="Quantity of Gas"
              type="number"
              sx={{
                width: "252px",
                borderRadius: "5px",
                border: "1px solid #D9D9D966",
                "& .MuiInputBase-input": {
                  padding: "10px 14px",
                  height: "auto",
                },
              }}
            ></TextField>
          </Grid2>
          {/* buttun */}
          <Grid2
            sx={{
              padding: "25px 70px 0px 70px",
              width: "100%",
              height: "125px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "50px",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                borderRadius: "32px",
                border: "1px solid #28814D",
                height: "38px",
                fontWeight: "400",
                fontSize: "12px",
                width: "100px",
                textTransform: "capitalize",
                color: "#28814D",
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                borderRadius: "32px",
                height: "38px",
                fontWeight: "400",
                fontSize: "12px",
                width: "100px",
                background: "#369D9C",
                textTransform: "capitalize",
                color: "#FFFFFF",
              }}
            >
              Proceed
            </Button>
          </Grid2>
        </DialogContent>
      </Grid2>
    </div>
  );
}

export default ProcessEmissionReports;
