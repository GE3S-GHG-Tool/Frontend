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
import React, { useEffect, useState } from "react";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import upstream from "../../../assets/images/upstream.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getUpstreams } from "../../../api/createReport";
import { useScope3 } from "../../../context/Scope3Context";
import { cleanNumber, formatNumber, handleCommaSeperatedKeyDown, handleCommaSeperatedPaste } from "../Pages/utils";

const UpstreamLeasedPopup = ({ onClose }) => {
  // State with one initial row

  const { upStreamData, setUpStreamData } = useScope3();
  const initialState = [
    {
      assetType: "",
      sourceOfEnergy: "",
      quantity: "",
      unit: "",
      sourceid: "",
    },
  ];

  const [fields, setFields] = useState(
    localStorage.getItem("upStreamData")
      ? JSON.parse(localStorage.getItem("upStreamData"))
      : initialState
  );
  const [assetMenu, setAssetMenu] = useState([]);
  const [energyMenu, setEnergyMenu] = useState([]);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    if (name === "quantity") {
      updatedFields[index][name] = cleanNumber(value);
    } else {
      updatedFields[index][name] = value;
    }
    setFields(updatedFields);

    if (name === "sourceOfEnergy") {
      const selectedAsset = energyMenu.find((item) => item._id === value);
      // console.log(selectedAsset);
      updatedFields[index]["unit"] = selectedAsset.units;
      updatedFields[index]["sourceOfEnergy"] = selectedAsset.source_of_energy;
      updatedFields[index]["sourceid"] = selectedAsset._id;
      setFields(updatedFields);
    }
    const hasQuantityField = Object.prototype.hasOwnProperty.call(
      updatedFields[index],
      "quantity"
    );
    const isQuantityFilled =
      hasQuantityField && updatedFields[index].quantity.trim() !== "";

    // If the row has a quantity field and it is filled, add a new row
    if (isQuantityFilled && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        {
          assetType: "",
          sourceOfEnergy: "",
          quantity: "",
          unit: "",
          sourceid: "",
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };
  const save = () => {
    localStorage.setItem("upStreamData", JSON.stringify(fields));
    setUpStreamData(fields);
    onClose();
  };
  const fetchData = async () => {
    const response = await getUpstreams();
    setAssetMenu(response?.data.asset_types);
    setEnergyMenu(response?.data.sources_of_energy);
    // console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(upStreamData);
    if (upStreamData && upStreamData.length > 0) {
      // console.log("gg", upStreamData);
      const upStreamDataFields = upStreamData.map((item) => ({
        assetType: item.assetType || "",
        sourceOfEnergy: item.sourceOfEnergy || "",
        quantity: item.quantity || "",
        unit: item.unit,
        sourceid: item.sourceid,
      }));
      setFields(upStreamDataFields);
    }
  }, [upStreamData]);
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
                      placeholder="Select Type"
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        margin: "0",
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                        "& .MuiSelect-select": {
                          padding: "9px 16px",
                        },
                      }}
                    >
                      {assetMenu?.map((asset, index) => (
                        <MenuItem key={index} value={asset.asset_type}>
                          {asset?.asset_type}
                        </MenuItem>
                      ))}
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
                    <FormControl fullWidth size="small">
                      <Select
                        name="sourceOfEnergy"
                        value={field.sourceid || ""}
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
                        {energyMenu?.map((asset, index) => (
                          <MenuItem key={index} value={asset._id}>
                            {asset?.source_of_energy}
                          </MenuItem>
                        ))}
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
                      size="small"
                      name="quantity"
                      value={formatNumber(field.quantity)}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => {
                        handleCommaSeperatedKeyDown(e)
                      }}
                      onPaste={(e) => {
                        handleCommaSeperatedPaste(e)
                      }}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter quantity"
                      sx={{
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "9px 16px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    />
                  </Grid2>
                )}

                {/* Unit */}
                {field.sourceOfEnergy && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Unit
                    </Typography>
                    <TextField
                      size="small"
                      name="unit"
                      value={field.unit}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      disabled
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
                {field?.quantity?.trim() !== "" && (
                  <img
                    src={trash}
                    alt="Delete"
                    style={{
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
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
            "&:hover": {
              background: "rgba(177, 233, 216, 0.30)",
            },
          }}
        >
          Clear All
        </Button>

        <Button
          onClick={save}
          sx={{
            borderRadius: "32px",
            height: "38px",
            fontWeight: "400",
            fontSize: "12px",
            width: "100px",
            textTransform: "capitalize",
            color: "#FFFFFF",
            background: "linear-gradient(102deg, #369D9C 0%, #28814D 100%)",
            "&:hover": {
              background: "linear-gradient(102deg, #369D9C 0%, #0F4124 100%)",
              boxShadow: "none",
            },
          }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};

export default UpstreamLeasedPopup;
