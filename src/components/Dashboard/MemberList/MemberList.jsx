import React, { useState } from "react";
import { Avatar } from "@mui/material";
import "./MemberList.css";
import avatar from "../../../assets/images/userimg.png";

const members = [
  {
    name: "Pranit Gaikar",
    img: "",
    email: "Pranit@growhut.in",
    facility: "Jaipur",
    userType: "Can Edit",
    lastActive: "2024-05-05",
  },
  {
    name: "John Doe",
    img: "",
    email: "john@growhut.in",
    facility: "Delhi",
    userType: "Read Only",
    lastActive: "2024-04-03",
  },
  {
    name: "Jane Smith",
    img: "",
    email: "jane@growhut.in",
    facility: "Mumbai",
    userType: "Can Edit",
    lastActive: "2024-02-10",
  },
  {
    name: "Jane Smith",
    img: "",
    email: "jane@growhut.in",
    facility: "Mumbai",
    userType: "Can Edit",
    lastActive: "2024-02-10",
  },
];

const MemberList = ({ searchQuery }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

    return (
        <div className="table-container">
            <table className="member-table">
                <thead>
                    <tr>
                        <th className='member-table-head'>Member Name
                            <button onClick={() => handleSort('name')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th className='member-table-head'>Email
                            <button onClick={() => handleSort('email')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th className='member-table-head'>Facility
                            <button onClick={() => handleSort('facility')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th className='member-table-head'>User Type
                            <button onClick={() => handleSort('userType')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th className='member-table-head'>Last Active
                            <button onClick={() => handleSort('lastActive')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map((member, index) => (
                        <tr key={index}>
                            <td style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Avatar src={avatar} alt="User Img" className='avatar' />
                                {member.name}
                            </td>
                            <td>{member.email}</td>
                            <td>{member.facility}</td>
                            <td>{member.userType}</td>
                            <td>{member.lastActive}</td>
                            <td>
                                <button onClick={(e) => handleClick(e, index)} className="more-button">
                                    ⋮
                                </button>
                                {selectedRow === index && anchorEl && (
                                    <div className="dropdown-menu">
                                        <button onClick={handleClose}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M11.8159 11.812H5.25336L2.21875 8.77734" stroke="url(#paint0_linear_1214_83338)" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.96875 5.03125L3.71875 10.2812" stroke="url(#paint1_linear_1214_83338)" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.25 11.8126H2.625C2.50897 11.8126 2.39769 11.7665 2.31564 11.6844C2.23359 11.6024 2.1875 11.4911 2.1875 11.3751V8.93109C2.18755 8.81521 2.23358 8.70409 2.31547 8.6221L9.05953 1.87804C9.14157 1.79605 9.25281 1.75 9.36879 1.75C9.48477 1.75 9.59601 1.79605 9.67805 1.87804L12.122 4.32038C12.204 4.40242 12.2501 4.51366 12.2501 4.62964C12.2501 4.74562 12.204 4.85686 12.122 4.9389L5.25 11.8126Z" stroke="url(#paint2_linear_1214_83338)" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7.4375 3.5L10.5 6.5625" stroke="url(#paint3_linear_1214_83338)" stroke-width="0.875" stroke-linecap="round" stroke-linejoin="round" />
                                            <defs>
                                                <linearGradient id="paint0_linear_1214_83338" x1="2.21875" y1="8.77734" x2="10.3148" y2="14.0966" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#369D9C" />
                                                    <stop offset="1" stop-color="#28814D" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_1214_83338" x1="3.71875" y1="5.03125" x2="9.7971" y2="6.29402" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#369D9C" />
                                                    <stop offset="1" stop-color="#28814D" />
                                                </linearGradient>
                                                <linearGradient id="paint2_linear_1214_83338" x1="2.1875" y1="1.75" x2="13.8377" y2="4.17033" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#369D9C" />
                                                    <stop offset="1" stop-color="#28814D" />
                                                </linearGradient>
                                                <linearGradient id="paint3_linear_1214_83338" x1="7.4375" y1="3.5" x2="10.9832" y2="4.23662" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#369D9C" />
                                                    <stop offset="1" stop-color="#28814D" />
                                                </linearGradient>
                                            </defs>
                                        </svg><span>&nbsp;Edit access</span></button> <hr style={{padding:'0',border:'1px solid #f2f1f0'}}/>
                                        <button onClick={handleClose}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M5.25 1.75H8.75M1.75 3.5H12.25M11.0833 3.5L10.6742 9.63625C10.6129 10.5569 10.5822 11.0172 10.3833 11.3663C10.2083 11.6735 9.94422 11.9206 9.62597 12.0748C9.26448 12.25 8.80314 12.25 7.88045 12.25H6.11955C5.19686 12.25 4.73552 12.25 4.37403 12.0748C4.05577 11.9206 3.79172 11.6735 3.61666 11.3663C3.41781 11.0172 3.38713 10.5569 3.32575 9.63625L2.91667 3.5M5.83333 6.125V9.04167M8.16667 6.125V9.04167" stroke="#EC4458" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg><span style={{color:'red'}}>&nbsp;Remove</span></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberList;
