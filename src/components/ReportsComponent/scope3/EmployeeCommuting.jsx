import { FormControl, Grid2, Select, TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import employee from "../../../assets/images/employee.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import trash from "../../../assets/images/TrashS.svg";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { getVehicleType } from "../../../api/createReport";
import { useScope3 } from "../../../context/Scope3Context";

function EmployeeCommuting() {
  // Initialize fields with one empty row

  const [fields, setFields] = useState(
    localStorage.getItem("commuting")
      ? JSON.parse(localStorage.getItem("commuting"))
      : [{ vehicle_type: "", num_trips: "", distance_km: "" }]
  );

  const [vehicleMenu, setVehicleMenu] = useState([]);
  const { setEmployeeCommuting } = useScope3();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    // console.log(name);
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row is complete
    const isRowComplete =
      updatedFields[index].vehicle_type &&
      updatedFields[index].num_trips &&
      updatedFields[index].distance_km;

    // If the current row is complete and it’s the last row, add a new row
    if (isRowComplete && index === fields.length - 1) {
      setFields([
        ...updatedFields,
        { vehicle_type: "", num_trips: "", distance_km: "" },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

    // Add a new empty row if there are no rows left
    if (updatedFields.length === 0) {
      updatedFields.push({
        vehicle_type: "",
        num_trips: "",
        distance_km: "",
      });
    }

    setFields(updatedFields);
  };

  const fetchData = async () => {
    const response = await getVehicleType();
    // console.log("vehicle", response?.data?.vehicle_type);
    setVehicleMenu(response?.data?.vehicle_type);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleDotClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // const handleEdit = () => {
  //   console.log("Edit clicked");
  //   setIsDropdownOpen(false);
  // };

  // const handleClearAll = () => {
  //   setIsDropdownOpen(false);
  // };
  useEffect(() => {
    localStorage.setItem("commuting", JSON.stringify(fields));
    setEmployeeCommuting(fields);
  }, [fields, setEmployeeCommuting]);
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
          <img src={employee} height={22} width={22} alt="Employee commuting" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0,
            }}
          >
            Employee Commuting
          </h2>
        </div>
      </div>

      <Box sx={{ marginBottom: "30px" }}>
        <Typography
          fontSize="12px"
          fontWeight="400"
          lineHeight="22.4px"
          color="#717171"
        >
          Provide details about the number of trips made by employees, vehicle
          type, and commute distance to calculate emissions from daily
          commuting.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {fields.map((field, index) => (
          <Box key={index} sx={{ display: "flex", gap: "10px" }}>
            <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
              <Grid2 item size={4}>
                <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                  Vehicle Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="vehicle_type"
                    value={field.vehicle_type}
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
                        padding: "11px 16px",
                        color: "	#343434",
                      },
                    }}
                  >
                    {vehicleMenu?.map((asset, index) => (
                      <MenuItem key={index} value={asset.name}>
                        {asset?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              {field.vehicle_type && (
                <>
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Number of Trips
                    </Typography>
                    <TextField
                      name="num_trips"
                      value={field.num_trips}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter number of trips"
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

                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Distance Traveled (in km)
                    </Typography>
                    <TextField
                      name="distance_km"
                      value={field.distance_km}
                      onChange={(e) => handleChange(index, e)}
                      variant="outlined"
                      fullWidth
                      type="number"
                      placeholder="Enter distance traveled"
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
                </>
              )}
            </Grid2>

            {field.vehicle_type && (
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
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
              </div>
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default EmployeeCommuting;
