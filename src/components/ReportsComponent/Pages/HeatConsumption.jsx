import { FormControl, Grid2, Select } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import heat from "../../../assets/images/heat.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";

function HeatConsumption() {
  // Initialize fields with quantity and unit
  const [field, setField] = useState({ quantity: "", unit: "MMBtu" });

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
          <img src={heat} height={22} width={22} alt="heat-logo" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0, // Removes default margin
            }}
          >
            Heat Consumption
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
          Provide the quantity of heat purchased to calculate related emissions.
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
                placeholder="Enter quantity"
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
                      />
              </FormControl>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
}

export default HeatConsumption;
