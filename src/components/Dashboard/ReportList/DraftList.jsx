import { useState } from "react";

const members = [
  {
    reportName: "Report 2022",
    year: "2020",
    month: "January",
    date: "3 days ago",
  },
  {
    reportName: "Report 2022",
    year: "2020",
    month: "January",
    date: "5 days ago",
  },
];

const DraftList = ({ searchQuery }) => {
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

  // const filteredMembers = sortedMembers.filter(
  //   (member) =>
  //     member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     member.facility.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.reportName}</td>
              <td>{member.year}</td>
              <td>{member.month}</td>
              <td>{member.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraftList;
