import { FormControl, Grid2, Select } from "@mui/material";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import goodsicon from "../../../assets/images/goods.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { getGoods } from "../../../api/createReport";
import { useScope3 } from "../../../context/Scope3Context";

function PurchasedGoods() {
  const [assetMenu, setAssetMenu] = useState([]);

  const { setGoods } = useScope3();
  const [fields, setFields] = useState(
    localStorage.getItem("goods")
      ? JSON.parse(localStorage.getItem("goods"))
      : [{ type_of_expense: "", expense_value: "" }]
  );

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].type_of_expense &&
      updatedFields[index].expense_value;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([...updatedFields, { type_of_expense: "", expense_value: "" }]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({ type_of_expense: "", expense_value: "" });
    }

    setFields(updatedFields);
  };

  useEffect(() => {
    localStorage.setItem("goods", JSON.stringify(fields));
    setGoods(fields);
  }, [fields, setGoods]);

  const fetchData = async () => {
    const response = await getGoods();
    // console.log("gooods", response?.data?.expense_types);
    setAssetMenu(response?.data?.expense_types);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <img src={goodsicon} height={22} width={22} alt="Goods" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0,
            }}
          >
            Purchased Goods
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
                  <FormControl fullWidth size="small">
                    <Select
                      name="type_of_expense"
                      value={field.type_of_expense}
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
                      {assetMenu.map((item, index) => (
                        <MenuItem key={index} value={item.type_of_expense}>
                          {item.type_of_expense}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {field.type_of_expense && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Expense Value
                    </Typography>
                    <TextField
                      name="expense_value"
                      value={field.expense_value}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter expense value"
                      type="number"
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

                {field.expense_value && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Currency
                    </Typography>

                    <TextField
                      fullWidth
                      name="currency"
                      value={"USD"}
                      disabled
                      size="small"
                      sx={{
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    ></TextField>
                  </Grid2>
                )}
              </Grid2>
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {field.type_of_expense && field.expense_value && (
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
