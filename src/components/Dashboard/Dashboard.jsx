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
import createReport from "../../assets/images/createReport.svg"

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState("Yearly");
  const [draftReports, setDraftReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [carbonTrackerData, setCarbonTrackerData] = useState([]);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index);

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
          time_period: timePeriod,
          year:year
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
      setIsLoading(true);
      const response = await getGeneratedReports(user?.organization?.id);
      if (response?.data?.success) {
        setReports(response.data.reports);
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.organization?.id) {  // Add this check
      fetchCarbonTrackerData();
    }
  }, [year, timePeriod, user?.organization?.id]);  // Add user?.organization?.id to dependencies

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
          <img src={createReport} alt="create report" />
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
      {isLoading ? (
        <div>
        </div>
      ) : (
        reports?.length > 0 ? (
          // This block only renders when there are reports
          <div>
            <div className="chart_header_box">
              <h3 className="dashboard_reports_header">Carbon Tracker</h3>
              <FormControl sx={{ minWidth: 120, display: 'flex', gap: '10px', flexDirection: 'row' }} size="small">
                <Select
                  labelId="year-label"
                  id="year-select"
                  value={year}
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
                  onChange={(event) => setYear(event.target.value)}
                >
                  {years.map((yearOption) => (
                    <MenuItem
                      key={yearOption}
                      value={yearOption}
                      className="text-xs p-2"
                    >
                      {yearOption}
                    </MenuItem>
                  ))}

                </Select>
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
          </div>
        ) : (
          // This block renders when there are no reports
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0',
            flexDirection: 'column'
          }}>
            <div>
              <img src={noReports} alt="No reports available" />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <p style={{
                margin: '0px 0px 30px 0px',
                fontSize: '12px',
                color: '#808080'
              }}>
                No data available to display in the Carbon Tracker at this time.
              </p>
              <button
                onClick={() => setOpenModal(true)}
                style={{
                  background: 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 2.4rem',
                  margin: '0 auto',
                  fontSize: '0.8rem'
                }}
              >
                Create GHG Report
              </button>
            </div>
          </div>
        )
      )}
      <StartReportModal open={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Dashboard;