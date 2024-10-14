import { FormControl, Grid2 } from "@mui/material";
import Typography from "@mui/material/Typography";
import electricity from "../../../assets/images/electricity.svg";
import dot_Icon from "../../../assets/images/DotsThreeVertical.svg";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import edit_icon from "../../../assets/images/edit_icon.svg";
import del_icon from "../../../assets/images/del_icon.svg";
import { useAuth } from "../../../context/AuthContext";
import { getscope2draft } from "../../../api/drafts";
import { useParams } from "react-router-dom";

function ElectricityConsumption() {
  const { id } = useParams();
  const storedField = localStorage.getItem("scope2Data");
  // console.log("storedField", storedField);

  const initialField = storedField
    ? JSON.parse(storedField)
    : { electricity: "" };

  const [field, setField] = useState({
    quantity: initialField.electricity,
    unit: "KWh",
  });
  // console.log("field", field);
  const { setScope2Data, scope2Data } = useAuth();
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setScope2Data((prev) => ({ ...prev, electricity: field.quantity }));
    const updatedScope2Data = { ...scope2Data, electricity: field.quantity };
    localStorage.setItem("scope2Data", JSON.stringify(updatedScope2Data));
  }, [field]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setField({ ...field, [name]: value });
  };
  const fetchEditData = async (id) => {
    const response = await getscope2draft(id);
    console.log("scope2", response);
    if (response.status === 200) {
      setField({
        ...field,
        ["quantity"]: response.data.electricityConsumption[0].quantity,
      });
    }
  };

  useEffect(() => {
    if (id) fetchEditData(id);
  }, [id]);
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
          <img
            src={electricity}
            height={22}
            width={22}
            alt="electricity-logo"
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
            Electricity Consumption
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
          Enter the total electricity consumed to estimate indirect emissions
          for Net import from grid.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
            <Grid2 item size={4}>
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Quantity
              </Typography>
              <TextField
                name="quantity"
                value={field.quantity}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="number"
                placeholder="Add quantity"
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
              <Typography variant="body1" sx={{ mb: 1, fontSize: "0.75rem" }}>
                Unit
              </Typography>
              <FormControl fullWidth>
                <TextField
                  name="unit"
                  value={field.unit}
                  disabled
                  variant="outlined"
                  fullWidth
                  sx={{
                    margin: "0",
                    border: "1px solid rgba(217, 217, 217, 0.0)",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(217, 217, 217, 0.30)",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "11px 16px",
                      color: "#717171",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(217, 217, 217, 0.30)",
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "#717171 !important",
                      WebkitTextFillColor: "#717171 !important",
                      opacity: 1,
                    },
                  }}
                />
              </FormControl>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
}

export default ElectricityConsumption;
