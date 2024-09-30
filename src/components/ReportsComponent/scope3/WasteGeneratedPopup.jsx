import {
  Box,
  Button,
  FormControl,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import waste from "../../../assets/images/wasteGenerated.svg";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const WasteGeneratedPopup = ({ onClose }) => {
  // State with one initial row
  const [fields, setFields] = useState([
    {
      wasteCategory: "",
      subCategory: "",
      disposalMethod: "",
      distanceToLandfill: "",
      fuelType: "",
      numberOfTrips: "",
      quantityOfWaste: "",
    },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete = Object.values(updatedFields[index]).every(
      (field) => field.trim() !== ""
    );

    // If the row is complete, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        {
          wasteCategory: "",
          subCategory: "",
          disposalMethod: "",
          distanceToLandfill: "",
          fuelType: "",
          numberOfTrips: "",
          quantityOfWaste: "",
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        position: "relative",
        flexDirection: "column",
        display: "flex",
        height: "100%",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
            width: "100%",
            marginBottom: "0.4rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img src={waste} height={22} width={22} alt="Waste Generated" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "28px",
                color: "#000000",
                margin: 0,
              }}
            >
              Waste Generated
            </h2>
          </div>
          <img
            src={x_logo}
            onClick={onClose}
            alt="dot-icon"
            height={26}
            width={26}
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              cursor: "pointer",
            }}
          />
        </div>
        <Typography
          fontSize="12px"
          fontWeight="400"
          lineHeight="22.4px"
          color="#717171"
        >
          Record the type and amount of waste produced, along with the disposal
          method, to assess emissions from waste processing.
        </Typography>
      </div>

      {/* This is the scrolling container */}
      <div
        style={{
          flexGrow: 1, // Allows the div to take remaining height
          overflowY: "auto", // Enables vertical scrolling
          maxHeight: "100%", // Set a maximum height to trigger overflow
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        {fields.map((field, index) => (
          <div
            style={{
              display: "flex",
              width: "100%",
              border: "1px solid #D9D9D966",
              padding: "1rem",
              borderRadius: "8px",
              flexDirection: "column",
            }}
          >
            <div
              key={index}
              style={{ display: "flex", gap: "0.5rem", width: "100%" }}
            >
              <Grid2
                sx={{ width: "100%" }}
                container
                columnSpacing={3}
                rowSpacing={2.5}
              >
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Waste Categories
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="wasteCategory"
                      value={field.wasteCategory}
                      onChange={(e) => handleChange(index, e)}
                      displayEmpty
                      placeholder="Select Type"
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiSelect-select': {
                          padding: '9px 16px',
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Type</span>
                      </MenuItem>
                      <MenuItem value={"Organic"}>Organic</MenuItem>
                      <MenuItem value={"Plastic"}>Plastic</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Sub Category: Visible only if wasteCategory is selected */}
                {field.wasteCategory && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Sub Categories
                    </Typography>
                    <FormControl fullWidth>

                      <Select
                        name="subCategory"
                        value={field.subCategory}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        placeholder="Select Type"
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{
                          margin: '0',
                          border: '1px solid rgba(217, 217, 217, 0.0)',
                          borderRadius: '5px',
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(217, 217, 217, 0.30)',
                          },
                          '& .MuiSelect-select': {
                            padding: '9px 16px',
                          }
                        }}
                      >
                        <MenuItem value="" disabled>
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Type</span>
                        </MenuItem>
                        <MenuItem value={"Newspaper"}>Newspaper</MenuItem>
                        <MenuItem value={"Glass"}>Glass</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Disposal Method: Visible only if subCategory is selected */}
                {field.subCategory && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Disposal Method
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="disposalMethod"
                        value={field.disposalMethod}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{
                          margin: '0',
                          border: '1px solid rgba(217, 217, 217, 0.0)',
                          borderRadius: '5px',
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(217, 217, 217, 0.30)',
                          },
                          '& .MuiSelect-select': {
                            padding: '9px 16px',
                          }
                        }}
                      >
                       <MenuItem value="" disabled>
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Method</span>
                        </MenuItem>
                        <MenuItem value={"Landfilled"}>Landfilled</MenuItem>
                        <MenuItem value={"Recycling"}>Recycling</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Distance of the landfill: Visible only if disposalMethod is selected */}
                {field.disposalMethod && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Distance of the landfill from pickup point
                    </Typography>
                    <TextField
                      name="distanceToLandfill"
                      value={field.distanceToLandfill}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter distance"
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '9px 16px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                      }}
                    />
                  </Grid2>
                )}

                {/* Fuel Type: Visible only if distanceToLandfill is entered */}
                {field.distanceToLandfill && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Fuel Type of Pickup Vehicle
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="fuelType"
                        value={field.fuelType}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{
                          margin: '0',
                          border: '1px solid rgba(217, 217, 217, 0.0)',
                          borderRadius: '5px',
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(217, 217, 217, 0.30)',
                          },
                          '& .MuiSelect-select': {
                            padding: '9px 16px',
                          }
                        }}
                      >
                        <MenuItem value="" disabled>
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Type</span>
                        </MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="Petrol">Petrol</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Number of Trips: Visible only if fuelType is selected */}
                {field.fuelType && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Number of Trips
                    </Typography>
                    <TextField
                      name="numberOfTrips"
                      value={field.numberOfTrips}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Number of trips"
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '9px 16px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                      }}
                    />
                  </Grid2>
                )}

                {/* Quantity of Waste: Visible only if numberOfTrips is entered */}
                {field.numberOfTrips && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Quantity of Waste
                    </Typography>
                    <TextField
                      name="quantityOfWaste"
                      value={field.quantityOfWaste}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="text"
                      placeholder="10 tonnes"
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '9px 16px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                      }}
                    />
                  </Grid2>
                )}
              </Grid2>

              {/* Show "hello" when the current row is filled */}
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {Object.values(field).every((val) => val.trim() !== "") && (
                  <img
                    src={trash}
                    alt="Delete"
                    style={{
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      visibility: Object.values(field).every(
                        (val) => val.trim() !== ""
                      )
                        ? "visible"
                        : "hidden",
                      pointerEvents: Object.values(field).every(
                        (val) => val.trim() !== ""
                      )
                        ? "auto"
                        : "none", // Disable interaction if not all fields are filled
                    }}
                    onClick={() => handleDelete(index)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
      >
        <Button
          sx={{
            borderRadius: "32px",
            border: "1px solid #28814D",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            textTransform: "capitalize",
            color: "#28814D",
            '&:hover': {
                background:
                  "rgba(177, 233, 216, 0.30)",
              },
          }}
        >
          Clear All
        </Button>

        <Button
          sx={{
            borderRadius: "32px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            textTransform: "capitalize",
            color: "#FFFFFF",
            background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
              '&:hover': {
                background:
                  "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
                boxShadow: 'none'
              },
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};

export default WasteGeneratedPopup;
