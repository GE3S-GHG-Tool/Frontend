import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGeneratedReports } from "../../../api/reports.apis"; // Adjust the path to your API function
import "./ReportList.css";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "@mui/material";

const ReportList = ({ searchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]); // State to store reports data
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const { user } = useAuth();

  // Function to fetch generated reports
  const fetchReports = async () => {
    try {
      const response = await getGeneratedReports(user?.organization?.id); // Call your API function
      if (response?.data?.success) {
        setReports(response.data.reports); // Assuming the reports data is in response.data.reports
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // Fetch reports when component mounts
  useEffect(() => {
    if (user?.organization?.id) {
      fetchReports();
    }
  }, [user?.organization?.id]);

  // Sorting function
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedReports = [...reports].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredReports = sortedReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.year.toString().includes(searchQuery.toLowerCase()) ||
      report.time_period.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const reportsToShow =
    location.pathname === "/" ? filteredReports.slice(0, 2) : filteredReports;

  return (
    <div className="table-container">
      <table className="member-table">
        <thead>
          <tr>
            <th className="member-table-head">Report Name</th>
            <th className="member-table-head">Year</th>
            <th className="member-table-head">Period</th>
            <th className="member-table-head">
              Generated date
              <Button
                onClick={() => handleSort("updatedAt")}
                disableRipple
                sx={{
                  padding: '2px',
                  '&:hover': {
                    bgcolor: 'transparent', // Ensures no background on hover
                  },
                  '&:focus': {
                    bgcolor: 'transparent', // Ensures no background on focus
                  },
                }}
              >
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                  <g id="Icon/CaretDoubleVertical">
                    <path
                      id="Vector"
                      d="M8.25 4.25L6 2L3.75 4.25"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M8.25 8.75L6 11L3.75 8.75"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </Button>
            </th>
            <th className="member-table-head">Scope</th>
          </tr>
        </thead>
        <tbody>
          {reportsToShow.map((report, index) => (
            <tr
              key={index}
              onClick={() => navigate(`/emissionreport/${report?._id}`)}
            >
              <td>{report.name}</td>
              <td>{report.year}</td>
              <td>{report.time_period}</td>
              <td>{new Date(report.updatedAt).toLocaleDateString()}</td>
              <td className="scope_tags">
                <span className="scope_tag1">S1</span>
                <span className="scope_tag2">S2</span>
                <span className="scope_tag3">S3</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportList;
