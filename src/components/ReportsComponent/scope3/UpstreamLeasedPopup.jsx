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
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import upstream from "../../../assets/images/upstream.svg";

const UpstreamLeasedPopup = ({ onClose }) => {
  // State with one initial row

  const initialState = [
    {
      assetType: "",
      sourceOfEnergy: "",
      quantity: "",
      unit: "",
    },
  ];

  const [fields, setFields] = useState(initialState);

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
          assetType: "",
          sourceOfEnergy: "",
          quantity: "",
          unit: "",
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
            <img
              src={upstream}
              height={20}
              width={20}
              alt="Upstream Leased Assets"
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
              Upstream Leased Assets
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
          Enter energy consumption details for leased assets used in operations
          to estimate upstream emissions.
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
                {/* Asset Type */}
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Asset Type
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="assetType"
                      value={field.assetType}
                      onChange={(e) => handleChange(index, e)}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        Select Asset Type
                      </MenuItem>
                      <MenuItem value={"Building"}>Building</MenuItem>
                      <MenuItem value={"Vehicle"}>Vehicle</MenuItem>
                      <MenuItem value={"Machinery"}>Machinery</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Source of Energy */}
                {field.assetType && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Source of Energy
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="sourceOfEnergy"
                        value={field.sourceOfEnergy}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          Select Source of Energy
                        </MenuItem>
                        <MenuItem value={"Electricity"}>Electricity</MenuItem>
                        <MenuItem value={"Diesel"}>Diesel</MenuItem>
                        <MenuItem value={"Solar"}>Solar</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Quantity */}
                {field.sourceOfEnergy && (
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
                    />
                  </Grid2>
                )}

                {/* Unit */}
                {field.quantity && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Unit
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="unit"
                        value={field.unit}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                      >
                        <MenuItem disabled value="">
                          Select Unit
                        </MenuItem>
                        <MenuItem value="Kilowatt-Hours">
                          Kilowatt-Hours
                        </MenuItem>
                        <MenuItem value="Liters">Liters</MenuItem>
                        <MenuItem value="Gallons">Gallons</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}
              </Grid2>

              {/* Trash Icon */}
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

      {/* Footer Buttons */}
      <div
        style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => setFields(initialState)}
          sx={{
            borderRadius: "32px",
            border: "1px solid #28814D",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            textTransform: "capitalize",
            color: "#28814D",
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
            background: "#369D9C",
            textTransform: "capitalize",
            color: "#FFFFFF",
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};

export default UpstreamLeasedPopup;
