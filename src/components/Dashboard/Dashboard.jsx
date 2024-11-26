import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StartReportModal from "../Modals/StartReportModal";
import DraftCard from "./DraftCard";
import ReportList from "./ReportList/ReportList";
import FootprintChart from "./charts/FootprintChart";
import { getDraftReports, getGeneratedReports } from "../../api/reports.apis";
import { useAuth } from "../../context/AuthContext";
import api from "../../api";
import noReports from "../../assets/images/noReports.svg"

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState("Monthly");
  const [draftReports, setDraftReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [carbonTrackerData, setCarbonTrackerData] = useState([]);

  const fetchDraftReports = async () => {
    try {
      const response = await getDraftReports(user?.organization?.id);
      if (response?.data?.success) {
        setDraftReports(response?.data?.reports.reverse());
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const transformData = (emissions, period) => {
    switch (period) {
      case "Monthly":
        return emissions.map(item => ({
          quarter: new Date(item.period).toLocaleString('default', { month: 'long' }),
          Scope1: item.scope1Emissions || 0,
          Scope2: item.scope2Emissions || 0,
          Scope3: item.scope3Emissions || 0
        }));
      case "Quartely":
        return emissions.map(item => ({
          quarter: item.period,
          Scope1: item.scope1Emissions || 0,
          Scope2: item.scope2Emissions || 0,
          Scope3: item.scope3Emissions || 0
        }));
      case "Half-Yearly":
        return emissions.map(item => ({
          quarter: item.period,
          Scope1: item.scope1Emissions || 0,
          Scope2: item.scope2Emissions || 0,
          Scope3: item.scope3Emissions || 0
        }));
      case "Yearly":
        return emissions.map(item => ({
          quarter: item.period.replace("yearly ", ""),
          Scope1: item.scope1Emissions || 0,
          Scope2: item.scope2Emissions || 0,
          Scope3: item.scope3Emissions || 0
        }));
      default:
        return [];
    }
  };

  const fetchCarbonTrackerData = async () => {
    try {
      const response = await api.get(`report/carbon_tracker`, {
        params: {
          organizationId: user?.organization?.id,
          time_period: timePeriod
        }
      });

      if (response.data.success) {
        const transformedData = transformData(response.data.emissions, timePeriod);
        setCarbonTrackerData(transformedData);
      } else {
        console.error("Failed to fetch carbon tracker data");
      }
    } catch (error) {
      console.error("Error fetching carbon tracker data:", error);
    }
  };

  // Function to fetch generated reports
  const fetchReports = async () => {
    try {
      const response = await getGeneratedReports(user?.organization?.id);
      if (response?.data?.success) {
        setReports(response.data.reports);
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    if (user?.organization?.id) {  // Add this check
      fetchCarbonTrackerData();
    }
  }, [timePeriod, user?.organization?.id]);  // Add user?.organization?.id to dependencies

  useEffect(() => {
    const keysToRemove = [
      "capitalGoodsData",
      "investements",
      "business",
      "commuting",
      "fuel",
      "downStreamData",
      "upStreamData",
      "wasteData",
      "goods",
      "refrigerent",
      "consumption",
      "processEmissionData",
      "scope2Data"
    ];

    keysToRemove.forEach(key => localStorage.removeItem(key));
  }, []);

  const handleDeleteDrafts = async (reportId) => {
    try {
      const response = await api.post('report/delete_draft_report', {
        reportId: reportId,
        organizationId: user?.organization?.id
      });

      if (response.data.success === true) {
        fetchDraftReports()
      } else {
        console.error('Failed to delete report:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (user?.organization?.id) {
      fetchDraftReports();
      fetchReports();
    }
  }, [user?.organization?.id]);

  return (
    <div>
      {draftReports.length > 0 && <h2 className="top_header_draft">Drafts</h2>}
      <div className="dashboard_top_cards">
        <div onClick={() => setOpenModal(true)} className="create_report_cta">
          <svg width="35" height="35" viewBox="0 0 37 37" fill="none">
            <g clipPath="url(#clip0_1214_46428)">
              <path
                d="M9.92188 8.51433V31.285C9.92188 33.1655 11.4329 34.6901 13.2967 34.6901H30.2413C32.1052 34.6901 33.6162 33.1655 33.6162 31.285V11.044C33.6162 10.1502 33.2678 9.29231 32.6464 8.65537L30.1783 6.12569C29.5439 5.47551 28.6774 5.10938 27.7732 5.10938H13.2967C11.4329 5.10938 9.92188 6.63381 9.92188 8.51433Z"
                fill="white"
                stroke="url(#paint0_linear_1214_46428)"
              />
              <path
                d="M12.5234 9.22266H19.8356"
                stroke="url(#paint1_linear_1214_46428)"
                strokeWidth="2.5077"
                strokeLinecap="round"
              />
              <path
                d="M12.5234 12.6289H31.0851"
                stroke="url(#paint2_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M12.5234 16.0312H31.0851"
                stroke="url(#paint3_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M12.5234 19.4375H31.0851"
                stroke="url(#paint4_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M12.5234 22.8438H31.0851"
                stroke="url(#paint5_linear_1214_46428)"
                strokeWidth="2.5077"
                strokeLinecap="round"
              />
              <path
                d="M4.04552 10.043L9.88688 32.0377C10.3693 33.8542 12.2198 34.9319 14.0202 34.4455L30.3874 30.0207C32.1878 29.534 33.2562 27.667 32.7738 25.8505L27.5814 6.29925C27.3521 5.43593 26.7956 4.6982 26.0319 4.24524L22.9989 2.44625C22.2194 1.98387 21.2885 1.85646 20.4151 2.09259L6.43189 5.8728C4.63152 6.3595 3.56311 8.22657 4.04552 10.043Z"
                fill="white"
                stroke="url(#paint6_linear_1214_46428)"
              />
              <path
                d="M6.73828 10.0501L13.8013 8.14062"
                stroke="url(#paint7_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M7.61328 13.3392L25.5425 8.49219"
                stroke="url(#paint8_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M8.48828 16.6282L26.4175 11.7812"
                stroke="url(#paint9_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M9.35938 19.9173L27.2886 15.0703"
                stroke="url(#paint10_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M10.2344 23.2063L28.1636 18.3594"
                stroke="url(#paint11_linear_1214_46428)"
                strokeLinecap="round"
              />
              <path
                d="M13.7888 33.5521C13.7888 31.75 12.3408 30.2891 10.5545 30.2891C8.76833 30.2891 7.32031 31.75 7.32031 33.5521C7.32031 35.3543 8.76833 36.8152 10.5545 36.8152C12.3408 36.8152 13.7888 35.3543 13.7888 33.5521Z"
                fill="white"
              />
              <path
                d="M13.7888 33.5521C13.7888 31.75 12.3408 30.2891 10.5545 30.2891C8.76833 30.2891 7.32031 31.75 7.32031 33.5521C7.32031 35.3543 8.76833 36.8152 10.5545 36.8152C12.3408 36.8152 13.7888 35.3543 13.7888 33.5521Z"
                stroke="url(#paint12_linear_1214_46428)"
                strokeWidth="0.417951"
              />
              <path
                d="M12 33.7294H10.747V35H10.2471V33.7294H9V33.2764H10.2471V32H10.747V33.2764H12V33.7294Z"
                fill="url(#paint13_linear_1214_46428)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1214_46428"
                x1="9.92188"
                y1="5.10938"
                x2="37.7675"
                y2="9.74314"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1214_46428"
                x1="12.5234"
                y1="9.22266"
                x2="15.1934"
                y2="13.2786"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1214_46428"
                x1="12.5234"
                y1="12.6289"
                x2="13.936"
                y2="18.0761"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_1214_46428"
                x1="12.5234"
                y1="16.0312"
                x2="13.936"
                y2="21.4784"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_1214_46428"
                x1="12.5234"
                y1="19.4375"
                x2="13.936"
                y2="24.8847"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_1214_46428"
                x1="12.5234"
                y1="22.8438"
                x2="13.936"
                y2="28.2909"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_1214_46428"
                x1="3.92969"
                y1="1.97656"
                x2="37.753"
                y2="8.22149"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_1214_46428"
                x1="6.73828"
                y1="8.14062"
                x2="12.1015"
                y2="12.2621"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_1214_46428"
                x1="7.61328"
                y1="8.49219"
                x2="21.2274"
                y2="18.9543"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_1214_46428"
                x1="8.48828"
                y1="11.7813"
                x2="22.1024"
                y2="22.2434"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint10_linear_1214_46428"
                x1="9.35938"
                y1="15.0703"
                x2="22.9735"
                y2="25.5325"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint11_linear_1214_46428"
                x1="10.2344"
                y1="18.3594"
                x2="23.8485"
                y2="28.8215"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint12_linear_1214_46428"
                x1="7.32031"
                y1="30.2891"
                x2="14.8148"
                y2="31.8323"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <linearGradient
                id="paint13_linear_1214_46428"
                x1="9"
                y1="32"
                x2="12.4733"
                y2="32.7216"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#369D9C" />
                <stop offset="1" stopColor="#28814D" />
              </linearGradient>
              <clipPath id="clip0_1214_46428">
                <rect
                  width="36"
                  height="37"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>Create GHG Report</p>
        </div>
        <div>
          <div style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "stretch",
            gap: "20px",
          }}>
            {draftReports?.slice(0, 3)?.map((item) => (
              <DraftCard key={item?._id} report={item} handleDelete={handleDeleteDrafts} />
            ))}
            {draftReports.length > 0 && <div className="view_all_report_cta">
              <span onClick={() => navigate("/report")}>View All</span>
            </div>}
          </div>
        </div>
      </div>
      {
        reports?.length > 0 ?
          <div>
            <div className="chart_header_box">
              <h3 className="dashboard_reports_header">Carbon Tracker</h3>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  labelId="time-period-label"
                  id="time-period-select"
                  value={timePeriod}
                  sx={{
                    fontSize: "0.75rem",
                    padding: "4px",
                    height: "35px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D9D9D9",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f7f7f7",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f7f7f7",
                    },
                    "& .MuiSelect-select": {
                      padding: "6px 10px",
                      fontSize: "0.75rem",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 150,
                      },
                    },
                  }}
                  inputProps={{
                    sx: {
                      padding: "0 8px",
                    },
                  }}
                  onChange={(event) => setTimePeriod(event.target.value)}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quartely">Quarterly</MenuItem>
                  <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="chart_box">
              <FootprintChart data={carbonTrackerData} />
            </div>
            <div>
              <h3 className="dashboard_reports_header">Generated reports</h3>
              <ReportList searchQuery={""} />
              <div className="reports_viewall_cta">
                <span onClick={() => navigate("/report")}>View All</span>
              </div>
            </div>
          </div> :
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', flexDirection: 'column' }}>
            <div>
              <img src={noReports} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <p style={{ margin: '0px 0px 30px 0px', fontSize: '12px', color: ' #808080' }}>No data available to display in the Carbon Tracker at this time.</p>
              <button onClick={() => setOpenModal(true)} style={{
                background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                color: '#fff',
                border: 'none',
                padding: '12px 2.4rem',
                margin: '0 auto', fontSize: '0.8rem'
              }}>Create GHG Report</button>
            </div>
          </div>
      }
      <StartReportModal open={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Dashboard;