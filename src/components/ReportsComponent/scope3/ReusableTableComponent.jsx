import { Grid2, Button } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";
import ReusableTable from "./ReusableTable";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import porces_Logo from "../../../assets/images/emisson_logo.svg";

function ReusableTableSection({
  title,
  description,
  icon,
  headings,
  tableData,
  buttonLabel = "Add More", // Default label for the button
  DialogContentComponent, // The component to display inside the dialog
  dialogComponentProps = {}, // Props to pass to the dialog content component
}) {
  const [open, setOpen] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

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
        {/* Inner Main */}
        <Grid2
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* Grid Header */}
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
                <img src={icon} height={20} width={20} alt={title} />
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    color: "#000000",
                    margin: 0, // Removes default margin
                  }}
                >
                  {title}
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
                {description}
              </Typography>
            </div>
          </Grid2>

          {/* Grid Second */}
          <ReusableTable data={tableData} headings={headings} />

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
              onClick={handleClickOpen}
            >
              {buttonLabel}
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
            height: "89vh",
            borderRadius: "16px",
          },
        }}
      >
        {/* Render the passed component with its props */}
        {DialogContentComponent && (
          <DialogContentComponent
            onClose={handleClose}
            {...dialogComponentProps} // Spread the props for the dialog content
          />
        )}
      </Dialog>
    </div>
  );
}

export default ReusableTableSection;
