import { FormControl, Grid2, Select } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import chilledWater from "../../../assets/images/chilledWater.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";

function ChilledWaterConsumption() {
  // Initialize fields with quantity and unit
  const [field, setField] = useState({ quantity: "", unit: "Ton-Hour" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
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
          <img
            src={chilledWater}
            height={22}
            width={22}
            alt="chilled-water-logo"
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
            Chilled Water Consumption
          </h2>
        </div>

        <div>
          <img src={dot_Icon} alt="dot-icon" height={24} width={24} />
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
          Input the amount of chilled water used to determine associated
          emissions.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
            <Grid2 item size={4}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Quantity
              </Typography>
              <TextField
                name="quantity"
                value={field.quantity}
                onChange={handleChange}
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
                      color: 'black', // Set the text color to black
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(217, 217, 217, 0.30)',
                    },
                  }}
              />
            </Grid2>

            <Grid2 item size={4}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
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
                      color: 'black', // Set the text color to black
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
          </Grid2>
        </Box>
      </Box>
    </div>
  );
}

export default ChilledWaterConsumption;
