import React from "react";
import { Grid2, Typography } from "@mui/material";
import { formatIndianNumber } from "../../../../util/utils";

const IntensityCard = ({ title, value, unit, bgColor }) => (
  <div
    style={{
      padding: "1rem 1.6rem",
      borderRadius: "8px",
      border: "1px solid rgba(217, 217, 217, 0.40)",
      background: bgColor,
    }}
  >
    <Typography
      sx={{ fontSize: "0.8rem", fontFamily: "Inter", fontWeight: "500" }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: "1rem",
        fontFamily: "Inter",
        fontWeight: "600",
        marginTop: "0.4rem",
      }}
    >
      {formatIndianNumber(value)} {unit}
    </Typography>
  </div>
);

const ScopeIntensity = ({ scopeData, scopeName, bgColor }) => (
  <>
    <Typography
      sx={{
        fontSize: "1rem",
        fontWeight: "600",
        fontFamily: "Inter",
        padding: "0.8rem",
      }}
    >
      {scopeName} Intensity Breakdown
    </Typography>
    <Grid2
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Grid2 item sx={{ width: "24.2%" }}>
        <IntensityCard
          title="Intensity by Floor Area"
          value={scopeData?.emissions_per_floor_area}
          unit="tCO2e/m2"
          bgColor={bgColor}
        />
      </Grid2>
      <Grid2 item sx={{ width: "24.2%" }}>
        <IntensityCard
          title="Intensity by Revenue"
          value={scopeData?.emissions_per_revenue}
          unit="tCO2e/$"
          bgColor={bgColor}
        />
      </Grid2>
      <Grid2 item sx={{ width: "24.2%" }}>
        <IntensityCard
          title="Intensity by Total Employees"
          value={scopeData?.emissions_per_employee}
          unit="tCO2e/employee"
          bgColor={bgColor}
        />
      </Grid2>
      <Grid2 item sx={{ width: "24.2%" }}>
        <IntensityCard
          title="Intensity by Total Production"
          value={scopeData?.emissions_per_production}
          unit="tCO2e/tonne"
          bgColor={bgColor}
        />
      </Grid2>
    </Grid2>
  </>
);

export default ScopeIntensity;
