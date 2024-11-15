import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import airplane from "../../../assets/images/aeroplane.svg";
import x_logo from "../../../assets/images/X_logo.svg";
import trash from "../../../assets/images/TrashS.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getAllAirport, getTraveltype } from "../../../api/createReport";
import { useScope3 } from "../../../context/Scope3Context";

const BusinessTravelPopup = ({ onClose }) => {
  // State with one initial row
  const [travelmenu, setTravelMenu] = useState([]);
  const [airportlist, setAirportList] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const { business, setBusiness } = useScope3();
  const [fields, setFields] = useState(
    localStorage.getItem("business")
      ? JSON.parse(localStorage.getItem("business"))
      : [
          {
            travelClass: "",
            origin: {},
            destination: {},
            connection: "",
            numberOfTrips: "",
            tripDetails: [],
          },
        ]
  );
  // const [fields, setFields] = useState([
  //   {
  //     travelClass: "",
  //     origin: {},
  //     destination: {},
  //     connection: "",
  //     numberOfTrips: "",
  //     tripDetails: [],
  //   },
  // ]);
  console.log("fields", fields);
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    // Check if the current row's connection has a value
    const hasConnectionDirect = updatedFields[index].connection; // Check for truthy value

    // If the connection has a value and this is the last row, add a new row
    if (hasConnectionDirect && index === fields.length - 1) {
      setFields((prevFields) => [
        ...prevFields,
        {
          travelClass: "",
          origin: "",
          destination: "",
          connection: "",
          numberOfTrips: "",
          tripDetails: [],
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const save = () => {
    localStorage.setItem("business", JSON.stringify(fields));
    setBusiness(fields);
    onClose();
  };
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const response = await getTraveltype();
    setTravelMenu(response?.data?.travel_classes);
  };
  const fetchAirport = async () => {
    const airports = await getAllAirport();
    const firstHundredAirports = airports.data.slice(0, 1000);
    // console.log("First 100 airports:", firstHundredAirports);
    // console.log("airport list:", airports.data);
    setAirportList(firstHundredAirports);
    setLoading(false);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAirports = airportlist.filter((item) =>
    item.nameAirport.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchData();
    fetchAirport();
  }, []);

  const handleTripChange = (index, tripIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[index].tripDetails[tripIndex] = value; // Update the specific trip detail
    setFields(updatedFields);
  };
  const renderTextFields = (index) => {
    const numberOfTrips = fields[index].numberOfTrips;
    let fieldsArray = [];
    for (let i = 0; i < numberOfTrips; i++) {
      fieldsArray.push(
        <Grid2 item size={4}>
          <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
            {`Connection to `}
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              key={`trip-${index}-${i}`}
              name="destination"
              renderValue={(selected) => (selected ? selected.nameAirport : "")}
              value={fields[index].tripDetails[i] || ""} // Bind the value to tripDetails
              onChange={(e) => handleTripChange(index, i, e.target.value)} // Handle trip input change
              IconComponent={KeyboardArrowDownIcon}
              MenuProps={{
                PaperProps: {
                  style: {
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
              {loading ? (
                <MenuItem value="" disabled>
                  <CircularProgress size={24} />{" "}
                  <span style={{ marginLeft: 10 }}>Loading...</span>
                </MenuItem>
              ) : filteredAirports.length > 0 ? (
                filteredAirports.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.nameAirport}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  No results found
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid2>
      );
    }
    return fieldsArray;
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
            <img src={airplane} height={20} width={20} alt="Business" />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "28px",
                color: "#000000",
                margin: 0,
              }}
            >
              Business Travel
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
          Enter details about travel type, details of airport, and class
          (business, economy, first) to calculate emissions from
          business-related travel.
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
                {/* Travel Class */}
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Travel Class
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      name="travelClass"
                      value={field.travelClass}
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
                      {travelmenu?.map((item, index) => (
                        <MenuItem key={index} value={item.class_name}>
                          {item?.class_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>

                {/* Origin */}
                {field.travelClass && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Origin
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="origin"
                        value={field.origin || ""} // Default to empty string if no value
                        onChange={(e) => handleChange(index, e)}
                        IconComponent={KeyboardArrowDownIcon}
                        renderValue={(selected) =>
                          selected ? selected.nameAirport : ""
                        }
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxWidth: 200,
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
                        {loading ? (
                          <MenuItem value="" disabled>
                            <CircularProgress size={24} />{" "}
                            <span style={{ marginLeft: 10 }}>Loading...</span>
                          </MenuItem>
                        ) : filteredAirports.length > 0 ? (
                          filteredAirports.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item.nameAirport}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            No results found
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Destination */}
                {Object.keys(field.origin).length > 0 && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Destination
                    </Typography>

                    <FormControl fullWidth size="small">
                      <Select
                        renderValue={(selected) =>
                          selected ? selected.nameAirport : ""
                        }
                        name="destination"
                        value={field.destination}
                        onChange={(e) => handleChange(index, e)}
                        IconComponent={KeyboardArrowDownIcon}
                        MenuProps={{
                          PaperProps: {
                            style: {
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
                        {loading ? (
                          <MenuItem value="" disabled>
                            <CircularProgress size={24} />{" "}
                            <span style={{ marginLeft: 10 }}>Loading...</span>
                          </MenuItem>
                        ) : filteredAirports.length > 0 ? (
                          filteredAirports.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item.nameAirport}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            No results found
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Connection Type */}
                {Object.keys(field.destination).length > 0 && (
                  <Grid2 item size={4}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontSize: "0.75rem" }}
                    >
                      Connection Type
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        name="connection"
                        value={field.connection}
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
                        <MenuItem value="0">Direct</MenuItem>
                        <MenuItem value="1">Connection</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                )}

                {/* Number of Trips */}
                {field.connection && field.connection !== "0" && (
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
                      onChange={(e) => {
                        setInputCount(e.target.value);
                        handleChange(index, e);
                      }}
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
                          padding: "9px 16px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(217, 217, 217, 0.30)",
                        },
                      }}
                    />
                  </Grid2>
                )}
                {renderTextFields(index)}
              </Grid2>

              {/* Show "hello" when the current row is filled */}
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {Object.prototype.hasOwnProperty.call(field, "connection") && (
                  <img
                    src={trash}
                    alt="Delete"
                    style={{
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      // visibility: Object.values(field).every(
                      //   (val) => val.trim() !== ""
                      // )
                      //   ? "visible"
                      //   : "hidden",
                      // pointerEvents: Object.values(field).every(
                      //   (val) => val.trim() !== ""
                      // )
                      //   ? "auto"
                      //   : "none", // Disable interaction if not all fields are filled
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
                travelClass: "",
                origin: {},
                destination: {},
                connection: "",
                numberOfTrips: "",
                tripDetails: [],
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

export default BusinessTravelPopup;
