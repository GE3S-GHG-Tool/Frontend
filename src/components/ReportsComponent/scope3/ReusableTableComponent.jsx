import { Grid2, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";
import ReusableTable from "./ReusableTable";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { useScope3 } from "../../../context/Scope3Context";
import FuelTable from "./FuelTable";
import UpStreamTable from "./UpStreamTable";
import WasteTable from "./WasteTable";

function ReusableTableSection({
  title,
  description,
  icon,
  headings,
  buttonLabel = "Add Data", // Default label for the button
  DialogContentComponent, // The component to display inside the dialog
  dialogComponentProps = {}, // Props to pass to the dialog content component
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data4, setData4] = useState(null);
  const { capitalGoods, fuelData, upStreamData, wasteData } = useScope3();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDotClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsDropdownOpen(false);
  };

  const handleClearAll = () => {
    setIsDropdownOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setData(fuelData ? fuelData : []);
    // console.log("fuelData instant:", fuelData); // Verify the table gets updated
  }, [fuelData]);

  useEffect(() => {
    setData1(capitalGoods ? capitalGoods : []);
    // console.log("Capital Goods instant:", capitalGoods); // Verify the table gets updated
  }, [capitalGoods]);

  useEffect(() => {
    setData2(upStreamData ? upStreamData : []);
    // console.log("Capital Goods instant:", upStreamData); // Verify the table gets updated
  }, [upStreamData]);

  useEffect(() => {
    setData4(wasteData ? wasteData : []);
    console.log("wasteData instant:", wasteData); // Verify the table gets updated
  }, [wasteData]);

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

              <div style={{ position: "relative" }}>
                <img
                  src={dot_Icon}
                  alt="dot-icon"
                  height="24px"
                  width="24px"
                  onClick={handleDotClick}
                  style={{ cursor: "pointer" }}
                />
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                      backgroundColor: "#FFF",
                      zIndex: 1,
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div
                      onClick={handleEdit}
                      style={{
                        padding: "5px 10px",
                        width: "8rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <img
                        src={edit_icon}
                        alt="dot-icon"
                        height="18px"
                        width="18px"
                      />{" "}
                      Edit
                    </div>
                    <div
                      onClick={handleClearAll}
                      style={{
                        padding: "5px 10px",
                        width: "8rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        color: "#FF9A9A",
                        gap: "4px",
                      }}
                    >
                      <img
                        src={del_icon}
                        alt="dot-icon"
                        height="18px"
                        width="18px"
                      />{" "}
                      Clear All
                    </div>
                  </div>
                )}
              </div>
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
          {title == "Fuel Related Activities" ? (
            <FuelTable data={data} headings={headings} />
          ) : title === "Upstream Leased Assets" ? (
            <UpStreamTable data={data2} headings={headings} />
          ) : title === "Waste Generated" ? (
            <WasteTable data={data4} headings={headings} />
          ) : (
            <ReusableTable data={data1} headings={headings} />
          )}

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
            width: "90vw",
            maxWidth: "80vw",
            borderRadius: "12px",
            "&::-webkit-scrollbar-thumb": {
              background: "#369d9c",
              borderRadius: "0px",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#369d9c",
            },
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
