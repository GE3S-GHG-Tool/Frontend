import { FormControl, Grid2, Select } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import fuelLogo from "../../../assets/images/fuel_logo.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import down_arrow from "../../../assets/images/down_arrow.svg";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";

function FuelConsumption() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([{ fuel: "", quantity: "", unit: "" }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].fuel &&
      updatedFields[index].quantity &&
      updatedFields[index].unit;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { fuel: "", quantity: "", unit: "" }]);
    }
  };

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
          <img src={fuelLogo} height={15} width={15} alt="fuel-logo" />
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
                      name="fuel"
                      value={field.fuel}
                      onChange={(e) => handleChange(index, e)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        Select Type
                      </MenuItem>
                      <MenuItem value={"Petrol"}>Petrol</MenuItem>
                      <MenuItem value={"CNG"}>CNG</MenuItem>
                      <MenuItem value={"Diesel"}>Diesel</MenuItem>
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
                    />
                  </Grid2>
                )}
                {field.quantity && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Unit
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="unit"
                        value={field.unit}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem disabled value="">
                          Select Unit
                        </MenuItem>
                        <MenuItem value={"Litre"}>Litre</MenuItem>
                        <MenuItem value={"m3"}>m3</MenuItem>
                      </Select>
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
