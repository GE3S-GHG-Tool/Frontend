import { useEffect, useState } from "react";
import { getDraftReports } from "../../../api/reports.apis";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const DraftList = ({ searchQuery }) => {
  const [reports, setReports] = useState([]);
  const { user } = useAuth()
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const navigate = useNavigate();

  // Function to fetch draft reports from the API
  const fetchReports = async () => {
    try {
      const response = await getDraftReports(user.organization.id); // Use your existing API function
      if (response?.data?.success) {
        setReports(response?.data?.reports?.reverse()); // Assuming the reports data is in response.data.reports
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // Fetch reports when component mounts
  useEffect(() => {
    fetchReports();
  }, []);

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

  // Filter the reports based on the search query
  const filteredReports = sortedReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.year.toString().includes(searchQuery.toLowerCase()) ||
      report.periodicity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-container">
      <table className="member-table">
        <thead>
          <tr>
            <th className="member-table-head">Report Name</th>
            <th className="member-table-head">Year</th>
            <th className="member-table-head">Period</th>
            <th className="member-table-head">
              Last Edit
              <button
                onClick={() => handleSort("updatedAt")}
                className="sort-button"
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
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr
              key={index}
              onClick={() => navigate(`/editreport/${report._id}`)} // Adjust the path based on your project structure
            >
              <td>{report.name}</td>
              <td>{report.year}</td>
              <td>{report.periodicity}</td>
              <td>{new Date(report.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraftList;
