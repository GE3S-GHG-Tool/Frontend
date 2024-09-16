import { Grid2 } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import capitalGoods from "../../../assets/images/capitalGoods.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";

function DownstreamAssets() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([
    { sumOfScopes: "", physicalArea: "", totalPhysicalArea: "" },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({
        sumOfScopes: "",
        physicalArea: "",
        totalPhysicalArea: "",
      });
    }

    setFields(updatedFields);
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
                  src={capitalGoods}
                  height={22}
                  width={22}
                  alt="chilled-water"
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
                  Downstream Assets
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
                Provide Emission details and area for leased assets in
                downstream operations to calculate associated emissions.
              </Typography>
            </div>
          </Grid2>
          {/* grid input second */}
          <Grid2 container spacing={2}>
            {fields.map((field, index) => (
              <Grid2 item xs={12} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start", // Align items at the start for better column alignment
                    gap: "20px", // Space between each input group
                    flexWrap: "wrap", // Allow wrapping if necessary
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Arrange label and input in a column
                      gap: "4px", // Space between label and input
                      alignItems: "flex-start", // Ensure alignment is consistent
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="19.6px"
                    >
                      Sum of Scope 1 & 2 emissions of lessee (tCO2e)
                    </Typography>
                    <TextField
                      name="sumOfScopes"
                      value={field.sumOfScopes}
                      placeholder="Add Percentage"
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "332.5px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        "& .MuiInputBase-input": {
                          padding: "10px 14px", // Add consistent padding
                          height: "auto", // Allow height to adjust automatically
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Arrange label and input in a column
                      gap: "4px", // Space between label and input
                      alignItems: "flex-start", // Ensure alignment is consistent
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="19.6px"
                    >
                      Total Physical area/volume of the lessor asset
                    </Typography>
                    <TextField
                      name="physicalArea"
                      type="number"
                      value={field.physicalArea}
                      placeholder="Add Value"
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "332.5px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        "& .MuiInputBase-input": {
                          padding: "10px 14px", // Add consistent padding
                          height: "auto", // Allow height to adjust automatically
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Arrange label and input in a column
                      gap: "4px", // Space between label and input
                      alignItems: "flex-start", // Ensure alignment is consistent
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="19.6px"
                    >
                      Physical area/volume of the leased asset
                    </Typography>
                    <TextField
                      name="totalPhysicalArea"
                      type="number"
                      value={field.totalPhysicalArea}
                      placeholder="Add Value"
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "332.5px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        "& .MuiInputBase-input": {
                          padding: "10px 14px", // Add consistent padding
                          height: "auto", // Allow height to adjust automatically
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default DownstreamAssets;
