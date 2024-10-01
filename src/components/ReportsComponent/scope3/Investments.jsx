import { Grid2, TextField } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import capitalGoods from "../../../assets/images/capitalGoods.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import Box from "@mui/material/Box";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";

function Investments() {
  // Initialize fields with investmentValue and investeeEmissions
  const [field, setField] = useState({
    investmentValue: "",
    investeeEmissions: "",
  });
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };

  // const handleDotClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // const handleEdit = () => {
  //   console.log("Edit clicked");
  //   setIsDropdownOpen(false);
  // };

  // const handleClearAll = () => {
  //   setIsDropdownOpen(false);
  // };

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

        {/* <div style={{ position: "relative" }}>
          <img
            src={dot_Icon}
            alt="dot-icon"
            height="24px"
            width="24px"
            onClick={handleDotClick}
            style={{ cursor: "pointer" }}
          />
          {isDropdownOpen && (
            <div style={{
              position: "absolute",
              right: 0,
              top: "100%",
              backgroundColor: "#FFF",
              zIndex: 1,
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.2)",
            }}>
              <div
                onClick={handleEdit}
                style={{
                  padding: "5px 10px",
                  width: '8rem',
                  cursor: "pointer",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <img
                  src={edit_icon}
                  alt="dot-icon"
                  height="18px"
                  width="18px"
                /> Edit
              </div>
              <div
                onClick={handleClearAll}
                style={{
                  padding: "5px 10px",
                  width: '8rem',
                  cursor: "pointer",
                  display: 'flex',
                  alignItems: 'center',
                  color: '#FF9A9A',
                  gap: '4px'
                }}
              ><img
                  src={del_icon}
                  alt="dot-icon"
                  height="18px"
                  width="18px"
                /> Clear All
              </div>
            </div>
          )}
        </div> */}
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
        Enter investments' ownership value and investee's company emission to estimate emissions from financed activities.
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
                  color:'	#343434'
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
                  color:'	#343434'
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
