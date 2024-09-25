import { Grid2, Button } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import porces_Logo from "../../../../assets/images/emisson_logo.svg";
import dot_Icon from "../../../../assets/images/DotsThreeVertical.svg";
import TablesData from "../TablesData";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import ProcessEmissionReports from "./ProcessEmissionReports";
function ProcessEmission() {
  // State to control dialog visibility
  const [open, setOpen] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const headings = [
    "Type of Process Emission",
    "Category",
    "Sub Category",
    "Sub Sub Category",
    "Sub Sub Sub Category",
    "Quantity",
  ];

  const tableData = [
    [
      "Waste Gas Disposal",
      "Flaringy",
      "Heavy oil/ cold bitumen Production",
      "-",
      "-",
      "56 10^3*m3",
    ],
    ["Waste Gas Disposal", "Flaringy", "Refining", "-", "-", "12 10^3*m3"],
    [
      "Process and Vented",
      "Oil and Gas Exploration",
      "Well Completion",
      "Offshore",
      "Gas",
      "45",
    ],
    [
      "Process and Vented",
      "Natural Gas Processing",
      "Natural G...",
      "Gas-Driv...",
      "Gas",
      "68",
    ],
  
  ];

  return (
    <div>
      {/* Main Grid */}
      <Grid2
        sx={{
          padding: "25px 45px 25px 45px",
          width: "90%",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          borderRadius: "16px",
        }}
      >
        {/* inner main */}
        <Grid2
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* grid header */}
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "6px",
                width: "100%", // Adjust as needed
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <img
                  src={porces_Logo}
                 width={18}
                 height={20}
                  alt="fuel-logo"
                />
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    color: "#000000",
                    margin: 0, // Removes default margin
                  }}
                >
                  Process Emission
                </h2>
              </div>
              <img src={dot_Icon} alt="dot-icon" height="24px" width="24px" />
            </div>

            <div>
              <Typography
                fontSize="12px"
                fontWeight="400"
                lineHeight="22.4px"
                color="#717171"
              >
                Input the type and amount of refrigerant used to account for
                emissions from refrigerant Consumption.
              </Typography>
            </div>
          </Grid2>
          {/* grid second */}
          <TablesData data={tableData} headings={headings} />
          <Grid2>
            <Button
              sx={{
               borderRadius: "32px",
                border: "1px solid #28814D",
                padding: "4px 12px",
                height: "36px",
                fontWeight: "400",
                fontSize: "12px",
                width: "100px",
                textTransform: "capitalize",
                color: "#28814D",
              }}
              onClick={handleClickOpen} // Open the dialog on button click
            >
              Add More
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
      {/* Popup Dialog Component */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "1100px",
            maxWidth: "1000px",
            maxHeight: "89vh",
            borderRadius: "16px",
          },
        }}
      >
        <ProcessEmissionReports onClose={handleClose} />
      </Dialog>
    </div>
  );
}

export default ProcessEmission;
