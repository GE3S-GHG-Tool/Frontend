import { Grid2 } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import fuelLogo from "../../../assets/images/fuel_logo.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import down_arrow from "../../../assets/images/down_arrow.svg";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
function FuelConsumption() {
  // Initialize fields with one empty row
  const [fields, setFields] = useState([
    { typeOfExpense: "", expenseValue: "", currency: "" },
  ]);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].typeOfExpense &&
      updatedFields[index].expenseValue &&
      updatedFields[index].currency;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        { typeOfExpense: "", expenseValue: "", currency: "" },
      ]);
    }
  };
  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ typeOfExpense: "", expenseValue: "", currency: "" });
    }

    setFields(updatedFields);
  };
  return (
    <div>
      {/* Main Grid */}
      <Grid2
        sx={{
          padding: "25px 45px 25px 45px",
          width: "90%",
          bgcolor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          borderRadius: "16px",
        }}
      >
        {/* inner main */}
        <Grid2
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* grid header */}
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "6px",
                width: "100%", // Adjust as needed
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <img
                  src={fuelLogo}
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
                    margin: 0, // Removes default margin
                  }}
                >
                  Purchased Goods
                </h2>
              </div>
              <img src={dot_Icon} alt="dot-icon" height="24px" width="24px" />
            </div>

            <div>
              <Typography
                fontSize="12px"
                fontWeight="400"
                lineHeight="22.4px"
                color="#717171"
              >
                Record expenses & type of goods purchased to calculate supply
                chain emissions.
              </Typography>
            </div>
          </Grid2>
          {/* grid input second */}
          <Grid2 container spacing={2}>
            {fields.map((field, index) => (
              <Grid2 item xs={12} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start", // Align items at the start for better column alignment
                    gap: "20px", // Space between each input group
                    flexWrap: "wrap", // Allow wrapping if necessary
                  }}
                >
                  {/* Fuel Type Input */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Arrange label and input in a column
                      gap: "4px", // Space between label and input
                      alignItems: "flex-start", // Ensure alignment is consistent
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="19.6px"
                    >
                      Type of Expense
                    </Typography>
                    <TextField
                      select
                      name="typeOfExpense"
                      value={field.typeOfExpense}
                      onChange={(e) => handleChange(index, e)}
                      sx={{
                        width: "332.5px",
                        borderRadius: "5px",
                        border: "1px solid #D9D9D966",
                        position: "reletive",
                        "& .MuiSelect-icon": {
                          display: "none",
                        },
                        "& .MuiInputBase-input": {
                          padding: "10px 14px 10px 14px", // Add consistent padding
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
                            Select Type
                          </Typography>
                          <img
                            src={down_arrow}
                            width="12px"
                            height="7px"
                            alt="Logo"
                            style={{
                              position: "absolute",
                              marginLeft: "290px",
                            }}
                          />
                        </Grid2>
                      </MenuItem>
                      <MenuItem value="Soyabean">Soyabean</MenuItem>
                    </TextField>
                  </Box>

                  {/* Show Quantity and Unit inputs only if Fuel Type is selected */}
                  {field.typeOfExpense && (
                    <>
                      {/* Quantity Input */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column", // Arrange label and input in a column
                          gap: "4px", // Space between label and input
                          alignItems: "flex-start", // Ensure alignment is consistent
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="19.6px"
                        >
                          Expense value
                        </Typography>
                        <TextField
                          name="expenseValue"
                          value={field.expenseValue}
                          placeholder="Expense Value"
                          onChange={(e) => handleChange(index, e)}
                          sx={{
                            width: "332.5px",
                            borderRadius: "5px",
                            border: "1px solid #D9D9D966",
                            "& .MuiInputBase-input": {
                              padding: "10px 14px", // Add consistent padding
                              height: "auto", // Allow height to adjust automatically
                            },
                          }}
                        />
                      </Box>

                      {/* Unit Input */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column", // Arrange label and input in a column
                          gap: "4px", // Space between label and input
                          alignItems: "flex-start", // Ensure alignment is consistent
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontSize="12px"
                          fontWeight="400"
                          lineHeight="19.6px"
                        >
                          Currency
                        </Typography>
                        <TextField
                          select
                          name="currency"
                          value={field.currency}
                          onChange={(e) => handleChange(index, e)}
                          sx={{
                            width: "332.5px",
                            borderRadius: "5px",
                            border: "1px solid #D9D9D966",
                            position: "reletive",
                            "& .MuiSelect-icon": {
                              display: "none", // Hide the select icon to match the fuel field
                            },
                            "& .MuiInputBase-input": {
                              padding: "10px 14px 10px 14px", // Add consistent padding
                              height: "8px", // Ensure consistent input height
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
                                Select Currency
                              </Typography>
                              <img
                                src={down_arrow}
                                width="12px"
                                height="7px"
                                alt="Logo"
                                style={{
                                  position: "absolute",
                                  marginLeft: "290px",
                                }}
                              />
                            </Grid2>
                          </MenuItem>
                          <MenuItem value="USD">US Dollars</MenuItem>
                          <MenuItem value="INR">Indian Rupees</MenuItem>
                        </TextField>
                      </Box>
                    </>
                  )}
                  {field.expenseValue || field.currency ? (
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
                        src={trash} // Path to your SVG delete icon
                        alt="Delete"
                        style={{
                          width: "20px",
                          height: "55px",
                          marginTop: "6px",
                          marginRight: "15px",
                        }} // Adjust the size as needed
                      />
                    </Box>
                  ) : null}
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default FuelConsumption;
