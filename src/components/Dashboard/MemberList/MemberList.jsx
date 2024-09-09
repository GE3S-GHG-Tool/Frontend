import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './MemberList.css'; // We'll create this CSS file for custom styles
import avatar from '../../../assets/images/userimg.png';

const members = [
    { name: 'Pranit Gaikar', img: "", email: 'Pranit@growhut.in', facility: 'Jaipur', userType: 'Can Edit', lastActive: '05-05-2024' },
    { name: 'John Doe', img: "", email: 'john@growhut.in', facility: 'Delhi', userType: 'Read Only', lastActive: '03-04-2024' },
    { name: 'Jane Smith', img: "", email: 'jane@growhut.in', facility: 'Mumbai', userType: 'Can Edit', lastActive: '10-02-2024' },
];

const MemberList = ({ searchQuery }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.facility.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <table className="member-table">
                <thead>
                    <tr>
                        <th>Member Name
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Email
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Facility
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>User Type
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Last Active onboarding
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map((member, index) => (
                        <tr key={index}>
                            <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Avatar src={avatar} alt="User Img" />
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
                                        <button onClick={handleClose}>Edit</button>
                                        <button onClick={handleClose}>Delete</button>
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