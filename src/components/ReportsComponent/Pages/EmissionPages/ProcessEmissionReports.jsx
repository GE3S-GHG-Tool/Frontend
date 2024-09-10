// ProcessEmissionReports.js
import React, { useState } from "react";
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
import ProsessEmissonVenting from "./ProsessEmissonVenting";

function ProcessEmissionReports({ onClose }) {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([{ fuel: "", quantity: "", unit: "" }]);
  const [gas2Fields, setGas2Fields] = useState([
    { fuel: "", quantity: "", unit: "" },
  ]);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].fuel &&
      updatedFields[index].quantity &&
      updatedFields[index].unit;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { fuel: "", quantity: "", unit: "" }]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ fuel: "", quantity: "", unit: "" });
    }

    setFields(updatedFields);
  };
  const handleGas2Change = (index, event) => {
    const newFields = [...gas2Fields];
    newFields[index][event.target.name] = event.target.value;
    setGas2Fields(newFields);
  };
  const handleDeleteGas2 = (index) => {
    const newFields = gas2Fields.filter((_, i) => i !== index);
    setGas2Fields(newFields);
  };

  return (
    <div>
      <Grid2
        sx={{
          padding: "30px 35px 30px 35px",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          borderRadius: "16px",
          position: "relative",
        }}
      >
        <DialogContent
          sx={{
            maxHeight: "500px", // Set a maximum height for the popup content
            overflowY: "auto", // Add vertical scroll if content overflows
            padding: 0, // Adjust padding if needed
            height: "550px",
          }}
        >
          <Grid2
            sx={{
              width: "98%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                  width: "100%",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <img
                    src={emisson_logo}
                    height="15px"
                    width="10px"
                    alt="fuel-logo"
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
                    Process Emission
                  </h2>
                </div>
                <img
                  src={x_logo}
                  onClick={onClose}
                  alt="dot-icon"
                  height="24px"
                  width="24px"
                  style={{
                    marginBottom: "30px",
                    marginRight: "25px",
                    position: "absolute",
                    right: "0",
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
                Record the type of industrial process and the quantity of
                product processed to calculate emissions directly related to
                production activities.
              </Typography>
            </Grid2>
            {/* gas1 */}
            <Grid2
              container
              spacing={2}
              sx={{
                border:
                  "1px solid var(--stroke-21, rgba(217, 217, 217, 0.40));",
                flexDirection: "column",
                display: "flex",
                padding: "18px",
                borderRadius: "8px",
              }}
            >
              {fields.map((field, index) => (
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
                        onChange={(e) => handleChange(index, e)}
                        sx={{
                          width: "252px",
                          borderRadius: "5px",
                          border: "1px solid #D9D9D966",
                          position: "reletive",
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
                            onChange={(e) => handleChange(index, e)}
                            sx={{
                              width: "252px",
                              position: "relative",
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
                            <MenuItem value="Unit1">
                              Sweet Gas Processing
                            </MenuItem>
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
                ></TextField>
              </Grid2>
            </Grid2>
            {/* gas2 */}
            <Grid2
              container
              spacing={2}
              sx={{
                border:
                  "1px solid var(--stroke-21, rgba(217, 217, 217, 0.40));",
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
                            <MenuItem value="Unit2">
                              Sweet Gas Processing
                            </MenuItem>
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
          </Grid2>
          {/* single */}
          <Grid2
            sx={{
              border: "1px solid var(--stroke-21, rgba(217, 217, 217, 0.40));",
              flexDirection: "column",
              display: "flex",
              padding: "18px",
              borderRadius: "8px",
              mt: "20px",
              width: "98%",
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
            ></TextField>
          </Grid2>
          {/* buttun */}
          <Grid2
            sx={{
              padding: "25px 70px 0px 70px",
              width: "100%",
              height: "125px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "50px",
              gap: "10px",
              justifyContent: "flex-end",
            }}
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
              }}
            >
              Cancel
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
              Proceed
            </Button>
          </Grid2>
        </DialogContent>
      </Grid2>
    </div>
  );
}

export default ProcessEmissionReports;
