import { FormControl, Grid2, Select } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import fuelLogo from "../../../assets/images/fuel_logo.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";

function FuelConsumption() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([{ fuel: "", quantity: "", unit: "" }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];

    if (name === "fuel") {
      // Set the unit based on the fuel type
      if (value === "Petrol" || value === "Diesel" || value === "LPG") {
        updatedFields[index].unit = "Gallons";
      } else if (value === "CNG") {
        updatedFields[index].unit = "m3";
      } else if (value === "HFO") {
        updatedFields[index].unit = "Barrels";
      } else {
        updatedFields[index].unit = "";
      }
    }

    updatedFields[index][name] = value;
    setFields(updatedFields);

    const isRowComplete = updatedFields[index].fuel;
    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { fuel: "", quantity: "", unit: "" }]);
    }
  }

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ fuel: "", quantity: "", unit: "" });
    }

    setFields(updatedFields);
  };

  return (
    <div
      style={{
        width: "90%",
        // border: "1px solid #D9D9D9",
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
          <img src={fuelLogo} height={20} width={18} alt="fuel-logo" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0, // Removes default margin
            }}
          >
            Fuel Consumption
          </h2>
        </div>

        <div>
          <img src={dot_Icon} alt="dot-icon" height="24px" width="24px" />
        </div>
      </div>

      <Box
        sx={{
          marginBottom: "30px",
        }}
      >
        <Typography
          fontSize="12px"
          fontWeight="400"
          lineHeight="22.4px"
          color="#717171"
        >
          Enter the type and quantity of fuel used (e.g., diesel, gasoline) to
          calculate direct emissions from combustion.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {fields.map((field, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Fuel Type
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={field.fuel}
                      name="fuel"
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
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Type</span>
                      </MenuItem>
                      <MenuItem value={"Petrol"}>Petrol</MenuItem>
                      <MenuItem value={"CNG"}>CNG</MenuItem>
                      <MenuItem value={"Diesel"}>Diesel</MenuItem>
                      <MenuItem value={"HFO"}>HFO</MenuItem>
                      <MenuItem value={"LPG"}>LPG</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                {field.fuel && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Quantity
                    </Typography>
                    <TextField
                      name="quantity"
                      value={field.quantity}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter quantity"
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
                )}
                {field.fuel && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Unit
                    </Typography>
                    <FormControl fullWidth>
                      <TextField
                        name="unit"
                        value={field.unit}
                        disabled
                        variant="outlined"
                        fullWidth
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
                          '& .MuiInputBase-input.Mui-disabled': {
                            color: 'grey !important',
                            WebkitTextFillColor: 'black !important',
                            opacity: 1,
                          },
                        }}
                      />
                    </FormControl>
                  </Grid2>
                )}
              </Grid2>

              {/* Show delete icon only if both fuel and quantity are filled */}
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {field.fuel && field.quantity && (
                  <img
                    onClick={() => handleDelete(index)}
                    src={trash} // Path to your SVG delete icon
                    alt="Delete"
                    style={{
                      width: "20px",
                      height: "55px",
                      marginTop: "6px",
                      cursor: "pointer",
                    }} // Adjust the size as needed
                  />
                )}
              </div>
            </Box>
          );
        })}
      </Box>
    </div>
  );
}

export default FuelConsumption;
