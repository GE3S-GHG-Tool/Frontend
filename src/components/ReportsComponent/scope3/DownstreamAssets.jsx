import { FormControl, Grid2, Select } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import downstream from "../../../assets/images/downstream.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";

function DownstreamAssets() {
  // Initialize fields with sumOfScopes, physicalArea, and totalPhysicalArea
  const [field, setField] = useState({
    sumOfScopes: "",
    physicalArea: "",
    totalPhysicalArea: "",
  });

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
            src={downstream}
            height={20}
            width={20}
            alt="downstream-assets"
          />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0,
            }}
          >
            Downstream Leased Assets
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
         Provide Emission details and area for leased assets in downstream operations to calculate associated emissions.
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
                Sum of Scope 1 & 2 Emissions of Lessee (tCO2e)
              </Typography>
              <TextField
                name="sumOfScopes"
                value={field.sumOfScopes}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                placeholder="Enter sum of scopes"
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
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Total Physical Area/Volume of the Lessor Asset
              </Typography>
              <TextField
                name="physicalArea"
                value={field.physicalArea}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                placeholder="Enter total physical area"
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
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Physical Area/Volume of the Leased Asset
              </Typography>
              <TextField
                name="totalPhysicalArea"
                value={field.totalPhysicalArea}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                placeholder="Enter physical area of leased asset"
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
          </Grid2>
        </Box>
      </Box>
    </div>
  );
}

export default DownstreamAssets;
