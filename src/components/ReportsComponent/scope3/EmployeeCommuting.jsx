import { Grid2 } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import employee from "../../../assets/images/employee.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import down_arrow from "../../../assets/images/down_arrow.svg";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
function EmployeeCommuting() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([
    { vehicleType: "", numOfTrips: "", distanceTraveled: "" },
  ]);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].vehicleType &&
      updatedFields[index].numOfTrips &&
      updatedFields[index].distanceTraveled;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        { vehicleType: "", numOfTrips: "", distanceTraveled: "" },
      ]);
    }
  };
  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({
        vehicleType: "",
        numOfTrips: "",
        distanceTraveled: "",
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
                <img src={employee} height={22} width={22} alt="fuel-logo" />
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "28px",
                    color: "#000000",
                    margin: 0, // Removes default margin
                  }}
                >
                  Employee Commuting
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
                Enter the type and quantity of fuel used (e.g., diesel,
                gasoline) to calculate direct emissions from combustion.
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
                      Vehicle Type
                    </Typography>
                    <TextField
                      select
                      name="vehicleType"
                      value={field.vehicleType}
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "332.5px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        position: "reletive",
                        "& .MuiSelect-icon": {
                          display: "none",
                        },
                        "& .MuiInputBase-input": {
                          padding: "10px 14px 10px 14px", // Add consistent padding
                          height: "8px",
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
                      <MenuItem value="Bike">Bike</MenuItem>
                      <MenuItem value="Car">Car</MenuItem>
                      <MenuItem value="Bus">Bus</MenuItem>
                    </TextField>
                  </Box>

                  {/* Show Quantity and Unit inputs only if Fuel Type is selected */}
                  {field.vehicleType && (
                    <>
                      {/* Quantity Input */}
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
                          Number of trips
                        </Typography>
                        <TextField
                          type="number"
                          name="numOfTrips"
                          value={field.numOfTrips}
                          placeholder="Enter value"
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
                          Distance Traveled in a Trip (In kilometres)
                        </Typography>
                        <TextField
                          type="number"
                          name="distanceTraveled"
                          value={field.distanceTraveled}
                          placeholder="Enter value"
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
                    </>
                  )}
                  {field.vehicleType || field.numOfTrips ? (
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

export default EmployeeCommuting;
