import { FormControl, Grid2, Select, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import employee from "../../../assets/images/employee.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        padding: "25px 45px",
        backgroundColor: "#fff",
        borderRadius: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img src={employee} height={22} width={22} alt="Employee commuting" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0,
            }}
          >
            Employee Commuting
          </h2>
        </div>
        <div>
          <img src={dot_Icon} alt="dot-icon" height="24px" width="24px" />
        </div>
      </div>

      <Box sx={{ marginBottom: "30px" }}>
        <Typography
          fontSize="12px"
          fontWeight="400"
          lineHeight="22.4px"
          color="#717171"
        >
          Enter vehicle type, number of trips, and distance traveled to
          calculate emissions related to employee commuting.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {fields.map((field, index) => (
          <Box key={index} sx={{ display: "flex", gap: "10px" }}>
            <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
              <Grid2 item size={4}>
                <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                  Vehicle Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="vehicleType"
                    value={field.vehicleType}
                    onChange={(e) => handleChange(index, e)}
                    displayEmpty
                    placeholder="Select Type"
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      margin: '0',
                      border: '1px solid rgba(217, 217, 217, 0.0)',
                      borderRadius: '5px',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(217, 217, 217, 0.30)',
                      },
                      '& .MuiSelect-select': {
                        padding: '11px 16px',
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Type</span>
                    </MenuItem>
                    <MenuItem value={"Bike"}>Bike</MenuItem>
                    <MenuItem value={"Car"}>Car</MenuItem>
                    <MenuItem value={"Bus"}>Bus</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>

              {field.vehicleType && (
                <>
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Number of Trips
                    </Typography>
                    <TextField
                      name="numOfTrips"
                      value={field.numOfTrips}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter number of trips"
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '11px 16px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Distance Traveled (in km)
                    </Typography>
                    <TextField
                      name="distanceTraveled"
                      value={field.distanceTraveled}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter distance traveled"
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '11px 16px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                      }}
                    />
                  </Grid2>
                </>
              )}
            </Grid2>

            {field.vehicleType && (
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                <img
                  onClick={() => handleDelete(index)}
                  src={trash}
                  alt="Delete"
                  style={{
                    width: "20px",
                    height: "55px",
                    marginTop: "6px",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default EmployeeCommuting;
