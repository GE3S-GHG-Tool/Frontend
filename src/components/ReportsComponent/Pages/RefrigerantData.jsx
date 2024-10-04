import { FormControl, Grid2, Select } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import refri_logo from "../../../assets/images/refri_logo.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useScope3 } from "../../../context/Scope3Context";
import { getRefrigenrentType } from "../../../api/createReport";

function RefrigerantData() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([
    { refrigerantType: "", quantity: "", unit: "" },
  ]);
  const [typeMenu, setTypeMenu] = useState([]);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setRefrigerent } = useScope3();
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];

    if (name === "refrigerantType") {
      updatedFields[index].unit = "Kg";
    }

    updatedFields[index][name] = value;
    setFields(updatedFields);

    const isRowComplete = updatedFields[index].refrigerantType;
    if (isRowComplete && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        { refrigerantType: "", quantity: "", unit: "" },
      ]);
    }
  };
  useEffect(() => {
    setRefrigerent(fields);
  }, [fields, setRefrigerent]);

  const fetchData = async () => {
    const response = await getRefrigenrentType();
    console.log("response list:", response.data);
    setTypeMenu(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ refrigerantType: "", quantity: "", unit: "" });
    }

    setFields(updatedFields);
  };

  // const handleDotClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // const handleEdit = () => {
  //   console.log("Edit clicked");
  //   setIsDropdownOpen(false);
  // };

  // const handleClearAll = () => {
  //   setFields([
  //     { refrigerantType: "", quantity: "", unit: "" },
  //   ]);
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
          <img
            src={refri_logo}
            height={18}
            width={18}
            alt="refrigerantType-logo"
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
            Refrigerant Data
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
          Input the type and amount of refrigerant used to account for emissions
          from refrigerant consumption.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {fields.map((field, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
              <Grid2 item size={4}>
                <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                  Type of refrigerant
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    name="refrigerantType"
                    value={field.refrigerantType}
                    onChange={(e) => handleChange(index, e)}
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      border: "1px solid rgba(217, 217, 217, 0.0)",
                      borderRadius: "5px",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(217, 217, 217, 0.30)",
                      },
                    }}
                  >
                    {typeMenu.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.Type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>
              {field.refrigerantType && (
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
                        color: "	#343434",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(217, 217, 217, 0.30)",
                      },
                    }}
                  />
                </Grid2>
              )}
              {field.refrigerantType && (
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

            {/* Show delete icon only if both refrigerantType type and quantity are filled */}
            <div
              style={{
                width: "20px",
                height: "55px",
              }}
            >
              {field.refrigerantType && field.quantity && (
                <img
                  onClick={() => handleDelete(index)}
                  src={trash}
                  alt="Delete"
                  style={{
                    width: "20px",
                    height: "55px",
                    marginTop: "6px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default RefrigerantData;
