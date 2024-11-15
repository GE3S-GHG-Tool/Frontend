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
import { useEffect, useState } from "react";
import capital from "../../../assets/images/capitalGoods.svg";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useScope3 } from "../../../context/Scope3Context";
import { getAssetType } from "../../../api/createReport";
const CapitalGoodsPopup = ({ onClose }) => {
  const { capitalGoods, setCapitalGoods } = useScope3();

  const [assetMenu, setAssetMenu] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState([]);
  // const [fields, setFields] = useState([
  //   {
  //     assetType: "",
  //     asset_category: "",
  //     expenses: "",
  //   },
  // ]);
  const [fields, setFields] = useState(
    localStorage.getItem("capitalGoodsData")
      ? JSON.parse(localStorage.getItem("capitalGoodsData"))
      : [
          {
            assetType: "",
            asset_category: "",
            expenses: "",
          },
        ]
  );
  console.log("capital goods:", fields);
  console.log("categoryMenu:", categoryMenu);

  useEffect(() => {
    if (capitalGoods && capitalGoods.length > 0) {
      const capitalGoodsFields = capitalGoods.map((item) => ({
        assetType: item.assetType || {},
        asset_category: item.asset_category || "",
        expenses: item.expenses || "",
      }));

      // Extract the categories array from each assetType and set it in the category menu
      const categoriesList = capitalGoodsFields
        .map((item) => item.assetType?.categories || [])
        .flat(); // Flatten the array in case each assetType has multiple categories

      // Set the fields and category menu
      setFields(capitalGoodsFields);
      setCategoryMenu(categoriesList);
    }
  }, [capitalGoods]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;

    const updatedFields = [...fields];

    if (name === "assetType") {
      const selectedAsset = assetMenu.find((asset) => asset._id === value); // Find the selected asset object by `_id`
      updatedFields[index].assetType = selectedAsset; // Store the full asset object

      setCategoryMenu(selectedAsset?.categories);
    } else {
      updatedFields[index][name] = value;
    }

    setFields(updatedFields);

    // Check if expenses field is filled and add a new empty object if it's the last one
    const hasExpensesValue = updatedFields[index].expenses.trim() !== "";

    if (hasExpensesValue && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        {
          assetType: "",
          asset_category: "",
          expenses: "",
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const save = () => {
    localStorage.setItem("capitalGoodsData", JSON.stringify(fields));
    setCapitalGoods(fields);
    onClose();
  };
  const fetchData = async () => {
    const response = await getAssetType();
    console.log("assetmenu", response?.data.asset_types);
    setAssetMenu(response?.data?.asset_types);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
            <img src={capital} height={20} width={20} alt="Capital Goods" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "28px",
                color: "#000000",
                margin: 0,
              }}
            >
              Capital Goods
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
          Record expenses and details about capital goods purchased to estimate
          lifecycle emissions from these assets.
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
                  <FormControl fullWidth size="small">
                    <Select
                      name="assetType"
                      value={field?.assetType?._id || ""}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Select Asset Type"
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        border: "1px solid rgba(217, 217, 217, 0.0)",
                        borderRadius: "5px",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    >
                      {assetMenu?.map((asset, index) => (
                        <MenuItem key={index} value={asset._id}>
                          {asset?.asset_type_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Asset Category */}
                {Object.keys(field?.assetType).length > 0 && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Asset Category
                    </Typography>

                    <FormControl fullWidth size="small">
                      <Select
                        name="asset_category"
                        value={field?.asset_category || ""}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Select Asset Type"
                        IconComponent={KeyboardArrowDownIcon}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxWidth: "fit-content",
                              maxHeight: 200, // Already set
                              overflowY: "auto", // Add scrolling behavior if the content is too long
                            },
                          },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getcontentanchorel: null, // Prevents the dropdown from jumping up when opened
                        }}
                        sx={{
                          border: "1px solid rgba(217, 217, 217, 0.0)",
                          borderRadius: "5px",
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(217, 217, 217, 0.30)",
                          },
                        }}
                      >
                        {categoryMenu?.map((asset, index) => (
                          <MenuItem
                            key={index}
                            value={asset.asset_category_name}
                          >
                            {asset?.asset_category_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Expenses */}
                {field.asset_category && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Expenses
                    </Typography>
                    <TextField
                      name="expenses"
                      value={field.expenses}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter expenses"
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
              </Grid2>

              {/* Trash Icon */}
              <div
                style={{
                  width: "20px",
                  cursor: "pointer",
                }}
              >
                {field.expenses.trim() !== "" && (
                  <img
                    src={trash}
                    alt="Delete"
                    style={{
                      height: "100%",
                      width: "100%",
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
                assetType: "",
                asset_category: "",
                expenses: "",
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

export default CapitalGoodsPopup;
