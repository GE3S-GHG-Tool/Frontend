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
import waste from "../../../assets/images/wasteGenerated.svg";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getWasteList } from "../../../api/createReport";
import { useScope3 } from "../../../context/Scope3Context";

const WasteGeneratedPopup = ({ onClose }) => {
  const [assetMenu, setAssetMenu] = useState([]);
  // const [subCategoryMenu, setSubCategoryMenu] = useState([]);
  const [subCategoryMenus, setSubCategoryMenus] = useState({});
  const [disposalMenus, setDisposalMenus] = useState({});
  const { wasteData, setWasteData } = useScope3();
  const [fields, setFields] = useState(
    localStorage.getItem("wasteData")
      ? JSON.parse(localStorage.getItem("wasteData"))
      : [
        {
          id: "",
          subCategoryid: "",
          wasteCategory: "",
          subCategory: "",
          disposalMethod: "",
          distanceToLandfill: "",
          fuelType: "",
          numberOfTrips: "",
          quantityOfWaste: "",
        },
      ]
  );

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
    if (name === "wasteCategory") {
      const selectedCategory = assetMenu.find((asset) => asset._id === value);
      updatedFields[index]["id"] = value;
      updatedFields[index][name] = selectedCategory.category_name;
      // setSubCategoryMenu(selectedCategory.subcategories);
      setSubCategoryMenus(prev => ({
        ...prev,
        [index]: selectedCategory.subcategories
      }));
      setFields(updatedFields);
    }
    if (name === "subCategory") {
      const selectedsubCategory = subCategoryMenus[index].find(
        (asset) => asset._id === value
      );
      updatedFields[index]["subCategoryid"] = value;
      updatedFields[index][name] = selectedsubCategory.subcategory_name;
      setDisposalMenus(prev => ({
        ...prev,
        [index]: selectedsubCategory.disposal_method
      }));
      setFields(updatedFields);
    }

    const hasExpensesValue = updatedFields[index].quantityOfWaste.trim() !== "";

    if (hasExpensesValue && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        {
          id: "",
          subCategoryid: "",
          wasteCategory: "",
          subCategory: "",
          disposalMethod: "",
          distanceToLandfill: "",
          fuelType: "",
          numberOfTrips: "",
          quantityOfWaste: "",
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };
  useEffect(() => {
    if (wasteData && wasteData.length > 0) {
      const wasteDatares = wasteData.map((item) => ({
        id: item.id || "",
        subCategoryid: item.subCategoryid || "",
        wasteCategory: item.wasteCategory || "",
        subCategory: item.subCategory || "",
        disposalMethod: item.disposalMethod || "",
        distanceToLandfill: item.distanceToLandfill || "",
        fuelType: item.fuelType || "",
        numberOfTrips: item.numberOfTrips || "",
        quantityOfWaste: item.quantityOfWaste || "",
      }));
      // console.log("data", wasteDatares);
      setFields(wasteDatares);
    }
  }, [wasteData]);

  const fetchData = async () => {
    const response = await getWasteList();
    // console.log("assetmenu", response?.data);
    setAssetMenu(response?.data?.categories);
  };

  const clear = () => {
    localStorage.removeItem("wasteData");

    setFields([
      {
        id: "",
        subCategoryid: "",
        wasteCategory: "",
        subCategory: "",
        disposalMethod: "",
        distanceToLandfill: "",
        fuelType: "",
        numberOfTrips: "",
        quantityOfWaste: "",
      },
    ]);
  };



  const save = () => {
    localStorage.setItem("wasteData", JSON.stringify(fields));
    setWasteData(fields);
    onClose();
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (fields.length) {
      const newSubCategoryMenus = {};
      const newDisposalMenus = {};
      fields.forEach((field, index) => {
        if (field.id) {
          const selectedCategory = assetMenu.find(
            (asset) => asset._id === field.id
          );
          if (selectedCategory) {
            newSubCategoryMenus[index] = selectedCategory.subcategories;
            
            // If subcategory exists, find its disposal methods
            if (field.subCategoryid) {
              const selectedSubCategory = selectedCategory.subcategories.find(
                sub => sub._id === field.subCategoryid
              );
              if (selectedSubCategory) {
                newDisposalMenus[index] = selectedSubCategory.disposal_method;
              }
            }
          }
        }
      });
      setSubCategoryMenus(newSubCategoryMenus);
      setDisposalMenus(newDisposalMenus);
    }
  }, [fields, assetMenu]);


  return (
    <Box
      sx={{
        padding: "2rem",
        position: "relative",
        flexDirection: "column",
        display: "flex",
        height: "100%",
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
            <img src={waste} height={22} width={22} alt="Waste Generated" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "28px",
                color: "#000000",
                margin: 0,
              }}
            >
              Waste Generated
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
          Record the type and amount of waste produced, along with the disposal
          method, to assess emissions from waste processing.
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
            <div
              key={index}
              style={{ display: "flex", gap: "0.5rem", width: "100%" }}
            >
              <Grid2
                sx={{ width: "100%" }}
                container
                columnSpacing={3}
                rowSpacing={2.5}
              >
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Waste Categories
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="wasteCategory"
                      value={field.id}
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
                        <MenuItem key={index} value={asset._id}>
                          {asset?.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Sub Category: Visible only if wasteCategory is selected */}
                {field.wasteCategory && (
                  <Grid2 item size={4}>
                    <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                      Sub Categories
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        name="subCategory"
                        value={field.subCategoryid}
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
                        {/* Use the subcategories for this specific row */}
                        {subCategoryMenus[index]?.map((asset, idx) => (
                          <MenuItem key={idx} value={asset._id}>
                            {asset?.subcategory_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Disposal Method: Visible only if subCategory is selected */}
                {field.subCategory && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Disposal Method
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="disposalMethod"
                        value={field.disposalMethod}
                        onChange={(e) => handleChange(index, e)}
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        sx={{
                          border: "1px solid rgba(217, 217, 217, 0.0)",
                          borderRadius: "5px",
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(217, 217, 217, 0.30)",
                          },
                        }}
                      >
                        {disposalMenus[index]?.map((asset, idx) => (
                          <MenuItem key={idx} value={asset.disposal_name}>
                            {asset?.disposal_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Distance of the landfill: Visible only if disposalMethod is selected */}
                {field.disposalMethod === "Landfilled" && (
                  <>
                    <Grid2 item size={4}>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1, fontSize: "0.75rem" }}
                      >
                        Distance of the landfill from pickup point
                      </Typography>
                      <TextField
                        name="distanceToLandfill"
                        value={field.distanceToLandfill}
                        onChange={(e) => handleChange(index, e)}
                        variant="outlined"
                        fullWidth
                        type="number"
                        placeholder="Enter distance"
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


                    {/* Fuel Type: Visible only if distanceToLandfill is entered */}
                    {field.distanceToLandfill && (
                      <Grid2 item size={4}>
                        <Typography
                          variant="body1"
                          sx={{ mb: 1, fontSize: "0.75rem" }}
                        >
                          Fuel Type of Pickup Vehicle
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            name="fuelType"
                            value={field.fuelType}
                            onChange={(e) => handleChange(index, e)}
                            displayEmpty
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
                            <MenuItem value="Diesel">Diesel</MenuItem>
                            <MenuItem value="Petrol">Petrol</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid2>
                    )}

                    {/* Number of Trips: Visible only if fuelType is selected */}
                    {field.fuelType && (
                      <Grid2 item size={4}>
                        <Typography
                          variant="body1"
                          sx={{ mb: 1, fontSize: "0.75rem" }}
                        >
                          Number of Trips
                        </Typography>
                        <TextField
                          name="numberOfTrips"
                          value={field.numberOfTrips}
                          onChange={(e) => handleChange(index, e)}
                          variant="outlined"
                          fullWidth
                          type="number"
                          placeholder="Number of trips"
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
                  </>
                )}
                {/* Quantity of Waste: Visible only if numberOfTrips is entered */}
                {((field.disposalMethod && field.disposalMethod !== "Landfilled") || (field.numberOfTrips)) && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Quantity of Waste
                    </Typography>
                    <TextField
                      name="quantityOfWaste"
                      value={field.quantityOfWaste}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="text"
                      placeholder="10 tonnes"
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



              {/* Show "hello" when the current row is filled */}
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
      <div
        style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
      >
        <Button
          onClick={clear}
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

export default WasteGeneratedPopup;
