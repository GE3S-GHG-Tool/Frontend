import { Grid2 } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import desalinated from "../../../assets/images/desalinatedWater.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import down_arrow from "../../../assets/images/down_arrow.svg";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
function DesalinatedWater() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([{ quantity: "", unit: "" }]);

  console.log(fields);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].quantity && updatedFields[index].unit;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { quantity: "", unit: "" }]);
    }
  };
  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ quantity: "", unit: "" });
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
                  src={desalinated}
                  height={22}
                  width={22}
                  alt="desalinated-water"
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
                  Purchased Desalinated Water
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
                Input the amount of desalinated water purchased to estimate
                emissions from the desalination process.
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
                  {/* Fuel Type Input */}
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
                      Quantity
                    </Typography>
                    <TextField
                      name="quantity"
                      value={field.quantity}
                      placeholder="Add Quantity"
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
                      Unit
                    </Typography>
                    <TextField
                      select
                      name="unit"
                      value={field.unit}
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "332.5px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        position: "reletive",
                        "& .MuiSelect-icon": {
                          display: "none", // Hide the select icon to match the fuel field
                        },
                        "& .MuiInputBase-input": {
                          padding: "10px 14px 10px 14px", // Add consistent padding
                          height: "8px", // Ensure consistent input height
                        },
                      }}
                      SelectProps={{
                        displayEmpty: true,
                      }}
                    >
                      <MenuItem value="" disabled>
                        <Grid2
                          flexDirection="row"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            fontSize="13px"
                            fontWeight="500"
                            lineHeight="22.4px"
                            color="#B0B0B0"
                          >
                            Select Type
                          </Typography>
                          <img
                            src={down_arrow}
                            width="12px"
                            height="7px"
                            alt="Logo"
                            style={{
                              position: "absolute",
                              marginLeft: "290px",
                            }}
                          />
                        </Grid2>
                      </MenuItem>
                      <MenuItem value="Fuel">litres</MenuItem>
                      <MenuItem value="Fuel2">Gallons</MenuItem>
                    </TextField>
                  </Box>

                  {field.quantity || field.unit ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => handleDelete(index)}
                        src={trash} // Path to your SVG delete icon
                        alt="Delete"
                        style={{
                          width: "20px",
                          height: "55px",
                          marginTop: "6px",
                          marginRight: "15px",
                        }} // Adjust the size as needed
                      />
                    </Box>
                  ) : null}
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default DesalinatedWater;
