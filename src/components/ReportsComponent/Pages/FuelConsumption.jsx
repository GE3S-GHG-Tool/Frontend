import { FormControl, Grid2, Select } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import fuelLogo from "../../../assets/images/fuel_logo.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
import { useScope3 } from "../../../context/Scope3Context";
import { getConsumtionType } from "../../../api/createReport";
import { useParams } from "react-router-dom";
import { getscope1draft } from "../../../api/drafts";

function FuelConsumption() {
  const { id } = useParams();

  // console.log("fc", id);

  // Initialize fields with one empty row
  const [fields, setFields] = useState(
    localStorage.getItem("consumption")
      ? JSON.parse(localStorage.getItem("consumption"))
      : [{ fuelType: "", quantity: "", unit: "" }]
  );
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setConsumption } = useScope3();
  const [typeMenu, setTypeMenu] = useState([]);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];

    if (name === "fuelType") {
      const selectedAsset = typeMenu.find((asset) => asset._id === value);
      updatedFields[index].unit = selectedAsset?.Unit;
    }

    updatedFields[index][name] = value;
    setFields(updatedFields);

    const isRowComplete = updatedFields[index].fuelType;
    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { fuelType: "", quantity: "", unit: "" }]);
    }
  };
  useEffect(() => {
    setConsumption(fields);
    localStorage.setItem("consumption", JSON.stringify(fields));
  }, [fields]);

  const fetchEditData = async (id) => {
    const response = await getscope1draft(id);

    const convertedData = response?.data?.fuelEntries?.map((item) => ({
      fuelType: item.fuel_type._id,
      quantity: item.quantity,
      unit: item.unit,
    }));
    setFields([...convertedData, { fuelType: "", quantity: "", unit: "" }]);
  };

  useEffect(() => {
    if (id) fetchEditData(id);
  }, [id]);

  const fetchData = async () => {
    const response = await getConsumtionType();
    setTypeMenu(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    if (updatedFields.length === 0) {
      updatedFields.push({ fuelType: "", quantity: "", unit: "" });
    }

    setFields(updatedFields);
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
          <img src={fuelLogo} height={20} width={18} alt="fuelType-logo" />
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
                 display:'flex',
                  alignItems:'center',
                  gap:'4px'
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
                  display:'flex',
                  alignItems:'center',
                  color:'#FF9A9A',
                  gap:'4px'
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
          Enter the type and quantity of fuelType used (e.g., diesel, gasoline)
          to calculate direct emissions from combustion.
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
                  <FormControl fullWidth size="small">
                    <Select
                      value={field.fuelType}
                      name="fuelType"
                      onChange={(e) => handleChange(index, e)}
                      IconComponent={KeyboardArrowDownIcon}
                      displayEmpty
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <em
                              style={{
                                color: "#BDBDBD",
                                fontFamily: " Arial, sans-serif",
                                fontSize: '0.875rem'
                              }}
                            >
                              Select fuel type
                            </em>
                          ); 
                        }
                        return (
                          typeMenu.find((item) => item._id === selected)
                            ?.Type || ""
                        );
                      }}
                      sx={{
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    >
                      <MenuItem disabled value="">
                        <em
                          style={{
                            color: "rgba(0, 0, 0, 0.54)",
                            fontFamily: "Arial, sans-serif",
                          }}
                        >
                          Select fuel type
                        </em>{" "}
                      </MenuItem>
                      {typeMenu.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.Type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                {field.fuelType && (
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
                        margin: "0",
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "11px 16px",
                          color: "#343434",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    />
                  </Grid2>
                )}
                {field.fuelType && (
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
                          margin: "0",
                          border: "1px solid rgba(217, 217, 217, 0.0)",
                          borderRadius: "5px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(217, 217, 217, 0.30)",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "11px 16px",
                            color: "#717171",
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
                )}
              </Grid2>

              {/* Show delete icon only if both fuelType and quantity are filled */}
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {field.fuelType && field.quantity && (
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
