import { Grid2, TextField } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import capitalGoods from "../../../assets/images/capitalGoods.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import Box from "@mui/material/Box";

function Investments() {
  // Initialize fields with investmentValue and investeeEmissions
  const [field, setField] = useState({
    investmentValue: "",
    investeeEmissions: "",
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
          <img src={capitalGoods} height={22} width={22} alt="capital-goods" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0,
            }}
          >
            Investments
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
          Provide details of investment values and emissions from the investee
          company to calculate related emissions.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
          <Grid2 item size={4}>
            <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
              Investment Value/Ownership Percentage
            </Typography>
            <TextField
              name="investmentValue"
              value={field.investmentValue}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Enter investment value or percentage"
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
              Investee Company's Emission
            </Typography>
            <TextField
              name="investeeEmissions"
              value={field.investeeEmissions}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              placeholder="Enter emissions"
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
    </div>
  );
}

export default Investments;
