import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid2,
} from "@mui/material";
import { useEffect, useState } from "react";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import fuelRelated from "../../../assets/images/fuelActivities.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getFuelCategoryList } from "../../../api/createReport";
import { useScope3 } from "../../../context/Scope3Context";

const FuelRelatedPopup = ({ onClose }) => {
  // State with one initial row
  const [fields, setFields] = useState(
    localStorage.getItem("fuel")
      ? JSON.parse(localStorage.getItem("fuel"))
      : [
          {
            id: "",
            category: "",
            subCategory: "",
            subsubCategory: "",
            quantity: "",
            unit: "",
          },
        ]
  );

  console.log("field", fields);
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [subCategoryMenu, setSubCategoryMenu] = useState([]);
  const { fuelData, setFuelData } = useScope3();
  // console.log(first)
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    if (name === "category") {
      const selectedAsset = categoryMenu.find((item) => item._id === value);
      updatedFields[index][name] = selectedAsset.category_name;
      updatedFields[index]["subCategory"] =
        selectedAsset?.subcategories[0]?.subcategory_name;
      updatedFields[index]["unit"] = selectedAsset?.subcategories[0]?.unit;
      updatedFields[index]["id"] = value;

      setSubCategoryMenu(selectedAsset?.subcategories);
      setFields(updatedFields);
    }
    if (name === "subsubCategory") {
      // console.log("subsubCategory value", value);
      updatedFields[index]["subsubCategory"] = value;
      setFields(updatedFields);
    }
    if (name === "quantity") {
      updatedFields[index]["quantity"] = value;
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
          id: "",
          category: "",
          subCategory: "",
          subsubCategory: "",
          quantity: "",
          unit: "",
        },
      ]);
    }
  };
  useEffect(() => {
    if (fuelData && fuelData.length > 0) {
      console.log("fuelData", fuelData);
      const capitalGoodsFields = fuelData.map((item) => ({
        id: item.id || "",
        category: item.category || "",
        subCategory: item.subCategory || "",
        subsubCategory: item.subsubCategory || "",
        quantity: item.quantity || "",
        unit: item.unit || "",
      }));
      setFields(capitalGoodsFields);
    }
  }, [fuelData]);
  const save = () => {
    localStorage.setItem("fuel", JSON.stringify(fields));
    setFuelData(fields);
    onClose();
  };
  const fetchData = async () => {
    const response = await getFuelCategoryList();
    setCategoryMenu(response?.data.categories);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
            <img src={fuelRelated} height={20} width={20} alt="Fuel Related" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "28px",
                color: "#000000",
                margin: 0,
              }}
            >
              Fuel Related
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
          Purchased Goods is a key performance indicator that measures the value
          of goods acquired from external suppliers by an organization.
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
                {/* Category */}
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Category
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      name="category"
                      value={field.id}
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
                      {categoryMenu?.map((asset, index) => (
                        <MenuItem key={index} value={asset._id}>
                          {asset?.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Sub Category */}
                {field.category && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Sub Category
                    </Typography>
                    <TextField
                      disabled
                      name="subCategory"
                      value={field.subCategory || ""}
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    />
                  </Grid2>
                )}

                {/* Sub Sub Category */}
                {field.category && subCategoryMenu.length > 1 && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Sub Sub Category
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="subsubCategory"
                        value={field.subsubCategory || ""}
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
                        {subCategoryMenu?.map((asset, index) => (
                          <MenuItem
                            key={index}
                            value={asset.subsubcategory_name}
                          >
                            {asset?.subsubcategory_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Quantity */}
                {field.subCategory && (
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
                      sx={{
                        margin: "0",
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
                {field.subCategory && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Unit
                    </Typography>
                    <TextField
                      disabled
                      name="unit"
                      value={field.unit || ""}
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
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
                {field.quantity.trim() !== "" && (
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
          onClick={() => {
            localStorage.removeItem("business");
            setFields([
              {
                id: "",
                category: "",
                subCategory: "",
                subsubCategory: "",
                quantity: "",
                unit: "",
              },
            ]);
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

export default FuelRelatedPopup;
