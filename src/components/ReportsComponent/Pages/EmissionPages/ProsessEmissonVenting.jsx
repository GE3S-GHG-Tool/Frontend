import React from "react";
// ProcessEmissionReports.js
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  MenuItem,
  Grid2,
} from "@mui/material";
import down_arrow from "../../../../assets/images/down_arrow.svg";
import trash_logo from "../../../../assets/images/TrashS.svg";
import emisson_logo from "../../../../assets/images/emisson_logo.svg";
import x_logo from "../../../../assets/images/X_logo.svg";
import { useState } from "react";

function ProsessEmissonVenting() {
  const [fields, setFields] = useState([{ fuel: "", quantity: "", unit: "" }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    const isRowComplete =
      updatedFields[index].fuel &&
      updatedFields[index].quantity &&
      updatedFields[index].unit;

    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { fuel: "", quantity: "", unit: "" }]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    if (updatedFields.length === 0) {
      updatedFields.push({ fuel: "", quantity: "", unit: "" });
    }

    setFields(updatedFields);
  };
  return (
    <div>
      <Grid2
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {fields.map((field, index) => (
          <Grid2>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="19.6px"
                >
                  Type of Process Emission
                </Typography>
                <TextField
                  select
                  name="fuel"
                  value={field.fuel}
                  onChange={(e) => handleChange(index, e)}
                  sx={{
                    width: "272px",
                    borderRadius: "5px",
                    border: "1px solid #D9D9D966",
                    "& .MuiSelect-icon": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 14px",
                      height: "8px",
                    },
                  }}
                  SelectProps={{
                    displayEmpty: true,
                  }}
                >
                  <MenuItem value="" disabled>
                    <Grid2
                      flexDirection="row"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        fontSize="13px"
                        fontWeight="500"
                        lineHeight="22.4px"
                        color="#B0B0B0"
                      >
                        Waste Gas Disposal
                      </Typography>
                      <img
                        src={down_arrow}
                        width="12px"
                        height="7px"
                        alt="Logo"
                      />
                    </Grid2>
                  </MenuItem>
                  <MenuItem value="Fuel">Process and Vented</MenuItem>
                  <MenuItem value="Fuel2">Fugitive</MenuItem>
                  <MenuItem value="Fuel3">Waste Gas Disposal</MenuItem>
                </TextField>
              </Box>

              {field.fuel && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="19.6px"
                    >
                      Category of Waste gas disposal
                    </Typography>
                    <TextField
                      name="quantity"
                      value={field.quantity}
                      placeholder="Quantity"
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "272px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        "& .MuiInputBase-input": {
                          padding: "10px 14px",
                          height: "auto",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="19.6px"
                    >
                      Category for Flaring
                    </Typography>
                    <TextField
                      select
                      name="unit"
                      value={field.unit}
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "272px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        "& .MuiSelect-icon": {
                          display: "none",
                        },
                        "& .MuiInputBase-input": {
                          padding: "10px 14px 10px 14px",
                          height: "8px",
                        },
                      }}
                      SelectProps={{
                        displayEmpty: true,
                      }}
                    >
                      <MenuItem value="" disabled>
                        <Grid2
                          flexDirection="row"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            fontSize="13px"
                            fontWeight="500"
                            lineHeight="22.4px"
                            color="#B0B0B0"
                          >
                            Flaring
                          </Typography>
                          <img
                            src={down_arrow}
                            width="12px"
                            height="7px"
                            alt="Logo"
                          />
                        </Grid2>
                      </MenuItem>
                      <MenuItem value="Unit1">Flaring</MenuItem>
                      <MenuItem value="Unit1">Sweet Gas Processing</MenuItem>
                      <MenuItem value="Unit1">
                        Conventional Oil Production
                      </MenuItem>
                    </TextField>
                  </Box>
                </>
              )}
              {field.quantity || field.unit ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    onClick={() => handleDelete(index)}
                    src={trash_logo}
                    alt="Delete"
                    style={{
                      width: "20px",
                      height: "55px",
                      marginTop: "6px",
                      marginRight: "15px",
                    }}
                  />
                </Box>
              ) : null}
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default ProsessEmissonVenting;
