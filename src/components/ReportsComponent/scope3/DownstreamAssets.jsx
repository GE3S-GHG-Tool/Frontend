import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import downstream from "../../../assets/images/downstream.svg";
import { TextField } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useScope3 } from "../../../context/Scope3Context";

function DownstreamAssets({ apiData }) {
  const [field, setField] = useState(
    localStorage.getItem("downStreamData")
      ? JSON.parse(localStorage.getItem("downStreamData"))
      : {
        scope1_scope2_emissions: "",
        physical_area: "",
        total_physical_area: "",
      }
  );



  useEffect(() => {
    if (apiData?.downstreamLeasedAssets[0]) {
      setField(apiData?.downstreamLeasedAssets[0])
    } else {
      setField({
        scope1_scope2_emissions: "",
        physical_area: "",
        total_physical_area: "",
      })
    }
  }, [apiData]);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setDownStreamData } = useScope3();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };
  useEffect(() => {
    localStorage.setItem("downStreamData", JSON.stringify(field));
    setDownStreamData(field);
  }, [field, setDownStreamData]);

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
          Provide Emission details and area for leased assets in downstream
          operations to calculate associated emissions.
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
                name="scope1_scope2_emissions"
                value={field?.scope1_scope2_emissions}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                placeholder="Add Value"
                sx={{
                  margin: "0",
                  border: "1px solid rgba(217, 217, 217, 0.0)",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "11px 16px",
                    color: "	#343434",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
                  },
                }}
              />
            </Grid2>

            <Grid2 item size={4}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Total Physical Area/Volume of the Lessor Asset
              </Typography>
              <TextField
                name="physical_area"
                value={field?.physical_area}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                placeholder="Add Value"
                sx={{
                  margin: "0",
                  border: "1px solid rgba(217, 217, 217, 0.0)",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "11px 16px",
                    color: "	#343434",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
                  },
                }}
              />
            </Grid2>

            <Grid2 item size={4}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Physical Area/Volume of the Leased Asset
              </Typography>
              <TextField
                name="total_physical_area"
                value={field?.total_physical_area}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                placeholder="Add Value"
                sx={{
                  margin: "0",
                  border: "1px solid rgba(217, 217, 217, 0.0)",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "11px 16px",
                    color: "	#343434",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
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
