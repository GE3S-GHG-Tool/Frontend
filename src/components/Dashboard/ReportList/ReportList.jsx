import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReportList.css";
const members = [
  {
    name: "Pranit Gaikar",
    img: "",
    reportName: "Report 2022",
    year: "2020",
    month: "January",
    date: "2024-02-10",
  },
  {
    name: "John Doe",
    img: "",
    reportName: "Report 2022",
    year: "2020",
    month: "January",
    date: "2024-02-10",
  },
  {
    name: "Jane Smith",
    img: "",
    reportName: "Report 2022",
    year: "2020",
    month: "January",
    date: "2024-02-10",
  },
  {
    name: "Jane Smith",
    img: "",
    reportName: "Report 2022",
    year: "2020",
    month: "January",
    date: "2024-02-10",
  },
];

const ReportList = ({ searchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedMembers = [...members].sort((a, b) => {
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

  const filteredMembers = sortedMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.facility.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const membersToShow =
    location.pathname === "/" ? filteredMembers.slice(0, 2) : filteredMembers;

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
              <button
                onClick={() => handleSort("lastActive")}
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
            <th className="member-table-head">Scope</th>
          </tr>
        </thead>
        <tbody>
          {membersToShow.map((member, index) => (
            <tr key={index} onClick={() => navigate("/reportgenerator")}>
              <td>{member.reportName}</td>
              <td>{member.year}</td>
              <td>{member.month}</td>
              <td>{member.date}</td>
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
