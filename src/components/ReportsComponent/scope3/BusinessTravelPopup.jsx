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
import airplane from "../../../assets/images/aeroplane.svg";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BusinessTravelPopup = ({ onClose }) => {
  // State with one initial row
  const [fields, setFields] = useState([
    {
      travelClass: "",
      origin: "",
      destination: "",
      connectionDirect: "",
      numberOfTrips: "",
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
          travelClass: "",
          origin: "",
          destination: "",
          connectionDirect: "",
          numberOfTrips: "",
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
        height: "100%", // Make the container take up full available height
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
            <img src={airplane} height={20} width={20} alt="Business" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "28px",
                color: "#000000",
                margin: 0,
              }}
            >
              Business Travel
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
          Enter details about travel type, details of airport, and class
          (business, economy, first) to calculate emissions from
          business-related travel.
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
            key={index}
            style={{
              display: "flex",
              width: "100%",
              border: "1px solid #D9D9D966",
              padding: "1rem",
              borderRadius: "8px",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
              <Grid2
                sx={{ width: "100%" }}
                container
                columnSpacing={3}
                rowSpacing={2.5}
              >
                {/* Travel Class */}
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Travel Class
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="travelClass"
                      value={field.travelClass}
                      onChange={(e) => handleChange(index, e)}
                      displayEmpty
                      placeholder="Select Class"
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
                        <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Class</span>
                      </MenuItem>
                      <MenuItem value={"Economy"}>Economy</MenuItem>
                      <MenuItem value={"Business"}>Business</MenuItem>
                      <MenuItem value={"First"}>First</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Origin */}
                {field.travelClass && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Origin
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="origin"
                        value={field.origin}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        placeholder="Select Origin"
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
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Origin</span>
                        </MenuItem>
                        <MenuItem value={"New York"}>New York</MenuItem>
                        <MenuItem value={"Los Angeles"}>Los Angeles</MenuItem>
                        <MenuItem value={"San Francisco"}>
                          San Francisco
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Destination */}
                {field.origin && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Destination
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="destination"
                        value={field.destination}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        placeholder="Select Destination"
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
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Destination</span>
                        </MenuItem>
                        <MenuItem value={"London"}>London</MenuItem>
                        <MenuItem value={"Tokyo"}>Tokyo</MenuItem>
                        <MenuItem value={"Paris"}>Paris</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Connection Type */}
                {field.destination && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Connection Type
                    </Typography>
                    <FormControl fullWidth>
                      
                      <Select
                        name="connectionDirect"
                        value={field.connectionDirect}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        placeholder="Select Connection type"
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
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Connection type</span>
                        </MenuItem>
                        <MenuItem value="Direct">Direct</MenuItem>
                        <MenuItem value="1 Stop">1 Stop</MenuItem>
                        <MenuItem value="2 Stops">2 Stops</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Number of Trips */}
                {field.connectionDirect && (
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
                      placeholder="Enter number of trips"
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

export default BusinessTravelPopup;
