import { Grid2, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import capitalGoods from "../../../assets/images/capitalGoods.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import Box from "@mui/material/Box";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { useScope3 } from "../../../context/Scope3Context";

function Investments() {
  // Initialize fields with ownership_percentage and investee_company_emissions

  const { setInvestements } = useScope3();
  const [field, setField] = useState(
    localStorage.getItem("investements")
      ? JSON.parse(localStorage.getItem("investements"))
      : {
          ownership_percentage: "",
          investee_company_emissions: "",
        }
  );

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };
  useEffect(() => {
    localStorage.setItem("investements", JSON.stringify(field));
    setInvestements(field);
  }, [field, setInvestements]);

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
          Enter investments&apos; ownership value and investee&apos;s company
          emission to estimate emissions from financed activities.
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
              size="small"
              name="ownership_percentage"
              value={field.ownership_percentage}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="Enter investment value or percentage"
              sx={{
                border: "1px solid rgba(217, 217, 217, 0.0)",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(217, 217, 217, 0.30)",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(217, 217, 217, 0.30)",
                },
              }}
            />
          </Grid2>

          <Grid2 item size={4}>
            <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
              Investee Company&apos;s Emission
            </Typography>
            <TextField
              name="investee_company_emissions"
              value={field.investee_company_emissions}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              size="small"
              placeholder="Enter emissions"
              sx={{
                border: "1px solid rgba(217, 217, 217, 0.0)",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(217, 217, 217, 0.30)",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(217, 217, 217, 0.30)",
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
