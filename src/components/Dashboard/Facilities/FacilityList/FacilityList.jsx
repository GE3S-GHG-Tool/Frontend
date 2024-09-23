import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./FacilityList.css";
import avatar from "../../../../assets/images/userimg.png";

const facilityData = [
  {
    name: "Royal Car Ltd",
    assigned: "Aman Upadhyay",
    sector: "Industry",
    industry: "Manufacturing sector",
    country: "India",
    address: "Haryana, Gurgaon, Near station",
  },
  {
    name: "Fast Wheels",
    assigned: "Priya Verma",
    sector: "Automobile",
    industry: "Vehicle Manufacturing",
    country: "USA",
    address: "California, LA",
  },
  {
    name: "Techno Steel",
    assigned: "Rohit Sharma",
    sector: "Construction",
    industry: "Steel Manufacturing",
    country: "India",
    address: "Noida, Sector 15",
  },
  {
    name: "Silver Industries",
    assigned: "Sana Khan",
    sector: "Mining",
    industry: "Silver Processing",
    country: "Australia",
    address: "Sydney, Near Harbour",
  },
];

const FacilityList = ({ searchQuery, setOpenEditModal }) => {
  const [sortedData, setSortedData] = useState(facilityData);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleSort = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key: columnKey, direction });
  };

  const handleSearch = (query) => {
    const filteredData = facilityData.filter(
      (facility) =>
        facility.name.toLowerCase().includes(query.toLowerCase()) ||
        facility.assigned.toLowerCase().includes(query.toLowerCase()) ||
        facility.sector.toLowerCase().includes(query.toLowerCase()) ||
        facility.industry.toLowerCase().includes(query.toLowerCase()) ||
        facility.country.toLowerCase().includes(query.toLowerCase()) ||
        facility.address.toLowerCase().includes(query.toLowerCase())
    );
    setSortedData(filteredData);
  };

  return (
    <div className="table-container">
      <table className="facility-table">
        <thead>
          <tr>
            <th>
              Facility Name
              <button
                onClick={() => handleSort("name")}
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
            <th>Assigned</th>
            <th>
              Sector
              <button
                onClick={() => handleSort("sector")}
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
            <th>
              Industry
              <button
                onClick={() => handleSort("industry")}
                className="sort-button"
              >
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <th>
              Country
              <button
                onClick={() => handleSort("country")}
                className="sort-button"
              >
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <th>
              Address
              <button
                onClick={() => handleSort("address")}
                className="sort-button"
              >
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
          {sortedData.map((facility, index) => (
            <tr key={index} onClick={() => setOpenEditModal(true)}>
              <td style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Avatar src={avatar} alt="Facility Img" className="avatar" />
                {facility.name}
              </td>
              <td>{facility.assigned}</td>
              <td>{facility.sector}</td>
              <td>{facility.industry}</td>
              <td>{facility.country}</td>
              <td>{facility.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacilityList;
