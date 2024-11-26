import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OverallSummary from "./SummaryCard/OverallSummary";
import ScopeIntensity from "./ScopeIntensity/ScopeIntensity";
import {
  getAnalyticsData,
  getGeneratedReports,
} from "../../../api/reports.apis";
import { useAuth } from "../../../context/AuthContext"
import analytics from "../../../assets/images/analytics.svg"


const Analytics = () => {
  const [scopeView, setScopeView] = useState(false);
  const [analtyicsData, setAnalyticsData] = useState(null);
  const [reportid, setReportId] = useState("");
  const [reports, setReports] = useState([]);
  const { user } = useAuth();
  const handleView = () => {
    setScopeView((prev) => !prev);
  };

  const fetchAnalytics = async (reportid) => {
    const response = await getAnalyticsData(reportid);
    if (response?.status === 200) {
      setAnalyticsData(response.data.analytics);
      // console.log("analytics", response.data.analytics);
    } else {
      console.error(response?.data?.message);
    }
  };
  const fetchAllReports = async () => {
    const response = await getGeneratedReports(user?.organization?.id);
    if (response?.status === 200) {
      setReports(response.data.reports);
      const lastReport =
        response.data.reports[response.data.reports.length - 1];
      // console.log("lastReport", lastReport);

      setReportId(lastReport._id);
    } else {
      console.error(response?.data?.message);
    }
  };

  useEffect(() => {
    if (user?.organization?.id) {  // Only fetch if we have the organization ID
      fetchAllReports();
    }
  }, [user]);

  useEffect(() => {
    if (reportid) fetchAnalytics(reportid);
  }, [reportid]);

  return (
    <>
      {
        user?.organization?.premiumPlan?.name === "FootPrint" ? (
          <Box sx={{
            height: '80vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 0',
                flexDirection: 'column',
                width: "50%",
                margin: '0 auto'
              }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: '500', pb: '0.5rem' }}>Access Comprehensive GHG Analytics</Typography>
                <div>
                  <img src={analytics} alt="analytics" width="200" />
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <p style={{
                    margin: '0px 0px 30px 0px',
                    fontSize: '12px',
                    color: '#808080',
                    textAlign: 'center'
                  }}>
                    Unlock valuable insights into your greenhouse gas emissions with our premium analytics plan. Gain full visibility and detailed reports to help you drive sustainability and compliance efforts effectively.
                  </p>
                  <button
                    style={{
                      background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 2.4rem',
                      margin: '0 auto',
                      fontSize: '0.8rem'
                    }}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </Box>
          </Box>
        ) :
          <>
            {
              user?.organization?.premiumPlan?.name &&
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
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
                    <FormControl sx={{ minWidth: 100 }} size="small">
                      <Select
                        IconComponent={KeyboardArrowDownIcon}
                        labelId="fiscal-year-label"
                        id="fiscal-year-select"
                        value={reportid}
                        sx={{
                          fontSize: "0.75rem",
                          padding: "4px",
                          height: "33px",
                          // Adjust the border color when focused
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#D9D9D9", // Default border color
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f7f7f7", // Border color on focus
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f7f7f7", // Border color on hover
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 200, // reduce dropdown size
                            },
                          },
                        }}
                        inputProps={{
                          sx: {
                            padding: "0 8px", // reduce the padding inside the select
                          },
                        }}
                        onChange={(event) => setReportId(event.target.value)}
                      >
                        {reports.map((item, index) => (
                          <MenuItem key={index} value={item._id}>
                            {item?.name} {item?.year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

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
                          {user?.organization?.premiumPlan?.name === "CarbonZero" && <ScopeIntensity
                            scopeData={analtyicsData?.scope3}
                            scopeName="Scope 3"
                            bgColor="#FFE6E3"
                          />}
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
              </>
            }
          </>
      }
    </>
  );
};

export default Analytics;
