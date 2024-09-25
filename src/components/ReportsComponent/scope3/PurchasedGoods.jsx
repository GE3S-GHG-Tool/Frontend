import { FormControl, Grid2, Select } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import goods from "../../../assets/images/goods.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";

function PurchasedGoods() {
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
          <img src={goods} height={22} width={22} alt="Goods" />
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

        <div>
          <img src={dot_Icon} alt="dot-icon" height="24px" width="24px" />
        </div>
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
          Record expenses & type of goods purchased to calculate supply chain
          emissions.
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
                    Type of Expense
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="typeOfExpense"
                      value={field.typeOfExpense}
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
                          padding: '11px 16px',
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Type</span>
                      </MenuItem>
                      <MenuItem value={"Soyabean"}>Soyabean</MenuItem>
                      <MenuItem value={"Electronics"}>Electronics</MenuItem>
                      <MenuItem value={"Furniture"}>Furniture</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>

                {field.typeOfExpense && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Expense Value
                    </Typography>
                    <TextField
                      name="expenseValue"
                      value={field.expenseValue}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter expense value"
                      type="number"
                      sx={{
                        margin: '0',
                        border: '1px solid rgba(217, 217, 217, 0.0)',
                        borderRadius: '5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '11px 16px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(217, 217, 217, 0.30)',
                        },
                      }}
                    />
                  </Grid2>
                )}

                {field.expenseValue && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Currency
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="currency"
                        value={field.currency}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        placeholder="Select Currency"
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{
                          margin: '0',
                          border: '1px solid rgba(217, 217, 217, 0.0)',
                          borderRadius: '5px',
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(217, 217, 217, 0.30)',
                          },
                          '& .MuiSelect-select': {
                            padding: '11px 16px',
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <span style={{ color: '#BDBDBD', fontSize: '0.875rem' }}>Select Currency</span>
                        </MenuItem>
                        <MenuItem value={"USD"}>US Dollars</MenuItem>
                        <MenuItem value={"INR"}>Indian Rupees</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}
              </Grid2>
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {field.typeOfExpense && field.expenseValue && (
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
          );
        })}
      </Box>
    </div>
  );
}

export default PurchasedGoods;
