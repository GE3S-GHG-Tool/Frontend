import { Grid2, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import capitalGoods from "../../../assets/images/capitalGoods.svg";
import Box from "@mui/material/Box";
import { useScope3 } from "../../../context/Scope3Context";
import trash from "../../../assets/images/TrashS.svg";

function Investments() {
  const { setInvestements } = useScope3();
  const [fields, setFields] = useState(
    localStorage.getItem("investements")
      ? JSON.parse(localStorage.getItem("investements"))
      : [
          {
            ownership_percentage: "",
            investee_company_emissions: "",
          },
        ]
  );

  useEffect(() => {
    localStorage.setItem("investements", JSON.stringify(fields));
    setInvestements(fields);
  }, [fields, setInvestements]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);

    const isMoreInvestmentsNeede =
      index == fields.length - 1 &&
      updatedFields[index].ownership_percentage &&
      updatedFields[index].investee_company_emissions;

    if (isMoreInvestmentsNeede) {
      setFields([
        ...updatedFields,
        {
          ownership_percentage: "",
          investee_company_emissions: "",
        },
      ]);
    }
  };

  const handleDelete = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);

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
          <img src={capitalGoods} height={22} width={22} alt="capital-goods" />
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "28px",
              color: "#000000",
              margin: 0,
            }}
          >
            Investments
          </h2>
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
          Enter investments&apos; ownership value and investee&apos;s company
          emission to estimate emissions from financed activities.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {fields.map((investment, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Grid2 sx={{ flexGrow: 1 }} container spacing={2.5}>
                <Grid2 item size={4}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, fontSize: "0.75rem" }}
                  >
                    Ownership Percentage
                  </Typography>
                  <TextField
                    size="small"
                    name="ownership_percentage"
                    value={investment.ownership_percentage}
                    onChange={(e) => handleChange(e, index)}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter Ownership percentage"
                    sx={{
                      border: "1px solid rgba(217, 217, 217, 0.0)",
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(217, 217, 217, 0.30)",
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
                    Investee Company&apos;s Emission (tCO2E)
                  </Typography>
                  <TextField
                    name="investee_company_emissions"
                    value={investment.investee_company_emissions}
                    onChange={(e) => handleChange(e, index)}
                    variant="outlined"
                    fullWidth
                    type="number"
                    size="small"
                    placeholder="Enter emissions"
                    sx={{
                      border: "1px solid rgba(217, 217, 217, 0.0)",
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(217, 217, 217, 0.30)",
                      },

                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(217, 217, 217, 0.30)",
                      },
                    }}
                  />
                </Grid2>
              </Grid2>
              <div
                style={{
                  width: "20px",
                  height: "55px",
                }}
              >
                {investment.ownership_percentage &&
                  investment.investee_company_emissions && (
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

export default Investments;
