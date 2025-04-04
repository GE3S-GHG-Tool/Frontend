import { FormControl, Grid2, Select } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import desalinated from "../../../assets/images/desalinatedWater.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { useAuth } from "../../../context/AuthContext";
import { getscope2draft } from "../../../api/drafts";
import { useParams } from "react-router-dom";
import { cleanNumber, formatNumber, handleCommaSeperatedKeyDown, handleCommaSeperatedPaste } from "./utils";

function DesalinatedWater() {
  const { id } = useParams();
  const storedField = localStorage.getItem("scope2Data");
  // console.log("storedField", storedField);

  const initialField = storedField
    ? JSON.parse(storedField)
    : { desalinated: "" };

  // Initialize fields with quantity and unit
  const [field, setField] = useState({
    quantity: initialField.desalinated,
    //unit: "Cubic Meter",
    unit: "m3",
  });
  // const [field, setField] = useState({ quantity: "", unit: "Cubic Meter" });

  const { setScope2Data, scope2Data } = useAuth();
  useEffect(() => {
    setScope2Data((prev) => ({ ...prev, desalinated: field.quantity }));
    const updatedScope2Data = { ...scope2Data, desalinated: field.quantity };
    localStorage.setItem("scope2Data", JSON.stringify(updatedScope2Data));
  }, [field, setScope2Data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "quantity") {
      // Clean the input value and store the unformatted value
      const cleanValue = cleanNumber(value);
      setField({ ...field, [name]: cleanValue });
    } else {
      setField({ ...field, [name]: value });
    }
  };
  const fetchEditData = async (id) => {
    const response = await getscope2draft(id);
    // console.log("scope2", response);
    if (response.status === 200) {
      setField({
        ...field,
        ["quantity"]:
          response?.data?.purchasedDesalinatedWaterConsumption[0]?.quantity,
      });
    }
  };

  useEffect(() => {
    if (id) fetchEditData(id);
  }, [id]);
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
            src={desalinated}
            height={20}
            width={20}
            alt="desalinated-water-logo"
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
            Purchased Desalinated Water
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
          Input the amount of desalinated water purchased to estimate emissions
          from the desalination process.
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
                value={formatNumber(field.quantity)}
                onChange={handleChange}
                onKeyDown={(e) => {
                  handleCommaSeperatedKeyDown(e)
                }}
                onPaste={(e) => {
                  handleCommaSeperatedPaste(e)
                }}
                variant="outlined"
                fullWidth
                placeholder="Add quantity"
                sx={{
                  margin: "0",
                  border: "1px solid rgba(217, 217, 217, 0.0)",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "11px 16px",
                    color: "	#343434", // Set the text color to black
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(217, 217, 217, 0.30)",
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
                    margin: "0",
                    border: "1px solid rgba(217, 217, 217, 0.0)",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(217, 217, 217, 0.30)",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "11px 16px",
                      color: "black", // Set the text color to black
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(217, 217, 217, 0.30)",
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "#717171 !important",
                      WebkitTextFillColor: "#717171 !important",
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

export default DesalinatedWater;
