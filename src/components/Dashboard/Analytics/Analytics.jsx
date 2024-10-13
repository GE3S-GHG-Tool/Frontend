import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import OverallSummary from "./SummaryCard/OverallSummary";
import ScopeIntensity from "./ScopeIntensity/ScopeIntensity";
import { getAnalyticsData } from "../../../api/reports.apis";

const Analytics = () => {
  const [scopeView, setScopeView] = useState(false);
  const [analtyicsData, setAnalyticsData] = useState(null);

  const handleView = () => {
    setScopeView((prev) => !prev);
  };

  const fetchReports = async () => {
    const response = await getAnalyticsData();
    if (response?.status === 200) {
      setAnalyticsData(response.data.analytics);
    } else {
      console.error(response?.data?.message);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography
        sx={{
          color: "#000000",
          fontSize: "1.20rem",
          fontWeight: "600",
          fontFamily: "Inter",
          lineHeight: "150%",
          marginTop: "0.38rem",
        }}
      >
        Overall Average Intensity
      </Typography>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <OverallSummary data={analtyicsData?.averages} />
          {scopeView ? (
            <>
              <ScopeIntensity
                scopeData={analtyicsData?.scope1}
                scopeName="Scope 1"
                bgColor="#E6F8F2"
              />
              <ScopeIntensity
                scopeData={analtyicsData?.scope2}
                scopeName="Scope 2"
                bgColor="#E9EFFF"
              />
              <ScopeIntensity
                scopeData={analtyicsData?.scope3}
                scopeName="Scope 3"
                bgColor="#FFE6E3"
              />
              <div style={{ display: "block", margin: "10px auto" }}>
                <Button
                  sx={{
                    background: "transparent",
                    border: "none",
                    color: "#717171",
                    fontSize: "0.8rem",
                    fontStyle: "Inter",
                    fontWeight: "500",
                    textTransform: "unset",
                  }}
                  onClick={handleView}
                >
                  View Less
                </Button>
              </div>
            </>
          ) : (
            <div style={{ display: "block", margin: "10px auto" }}>
              <Button
                sx={{
                  background: "transparent",
                  border: "none",
                  color: "#717171",
                  fontSize: "0.8rem",
                  fontStyle: "Inter",
                  fontWeight: "500",
                  textTransform: "unset",
                }}
                onClick={handleView}
              >
                View More
              </Button>
            </div>
          )}
          {/* <div style={{ marginTop: "2rem" }}>
            <FacilityComparison />
          </div> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
