import React from "react";
import { useState } from "react";
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
import trash_logo from "../../../../assets/images/TrashS.svg"
import emisson_logo from "../../../../assets/images/emisson_logo.svg"
import x_logo from "../../../../assets/images/X_logo.svg";
import ProsessEmissonVenting from "./ProsessEmissonVenting";

function Gas2PopupEmission() {
  const [gas2Fields, setGas2Fields] = useState([
    { fuel: "", quantity: "", unit: "" },
  ]);
  const handleGas2Change = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...gas2Fields];
    updatedFields[index][name] = value;
    setGas2Fields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].fuel &&
      updatedFields[index].quantity &&
      updatedFields[index].unit;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === gas2Fields.length - 1) {
      setGas2Fields([...updatedFields, { fuel: "", quantity: "", unit: "" }]);
    }
  };

  const handleDeleteGas2 = (index) => {
    const updatedFields = gas2Fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ fuel: "", quantity: "", unit: "" });
    }

    setGas2Fields(updatedFields);
  };
  return (
    <div>
      <Grid2
        container
        spacing={2}
        sx={{
          border: "1px solid var(--stroke-21, rgba(217, 217, 217, 0.40));",
          flexDirection: "column",
          display: "flex",
          padding: "18px",
          borderRadius: "8px",
        }}
      >
        {gas2Fields.map((field, index) => (
          <Grid2 item xs={12} key={index}>
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
                  onChange={(e) => handleGas2Change(index, e)}
                  sx={{
                    width: "252px",
                    borderRadius: "5px",
                    border: "1px solid #D9D9D966",
                    position: "relative",
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
                        style={{
                          position: "absolute",
                          marginLeft: "210px",
                        }}
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
                      onChange={(e) => handleGas2Change(index, e)}
                      sx={{
                        width: "252px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        position: "reletive",
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
                      onChange={(e) => handleGas2Change(index, e)}
                      sx={{
                        width: "252px",
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
                            style={{
                              position: "absolute",
                              marginLeft: "210px",
                            }}
                          />
                        </Grid2>
                      </MenuItem>
                      <MenuItem value="Unit1">Flaring</MenuItem>
                      <MenuItem value="Unit2">Sweet Gas Processing</MenuItem>
                      <MenuItem value="Unit3">
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
                    onClick={() => handleDeleteGas2(index)}
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

        <Grid2
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
            Quantity of gas production (m3)
          </Typography>
          <TextField
            placeholder="Quantity of Gas"
            type="number"
            sx={{
              width: "252px",
              borderRadius: "5px",
              border: "1px solid #D9D9D966",
              "& .MuiInputBase-input": {
                padding: "10px 14px",
                height: "auto",
              },
            }}
          />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default Gas2PopupEmission;
