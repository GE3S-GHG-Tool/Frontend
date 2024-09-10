import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './MemberList.css';
import avatar from '../../../assets/images/userimg.png';

const members = [
    { name: 'Pranit Gaikar', img: "", email: 'Pranit@growhut.in', facility: 'Jaipur', userType: 'Can Edit', lastActive: '2024-05-05' },
    { name: 'John Doe', img: "", email: 'john@growhut.in', facility: 'Delhi', userType: 'Read Only', lastActive: '2024-04-03' },
    { name: 'Jane Smith', img: "", email: 'jane@growhut.in', facility: 'Mumbai', userType: 'Can Edit', lastActive: '2024-02-10' },
];

const MemberList = ({ searchQuery }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedMembers = [...members].sort((a, b) => {
        if (sortConfig.key) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });

    const filteredMembers = sortedMembers.filter(member =>
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
                            <button onClick={() => handleSort('name')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th>Email
                            <button onClick={() => handleSort('email')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th>Facility
                            <button onClick={() => handleSort('facility')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th onClick={() => handleSort('userType')}>User Type
                            <button onClick={() => handleSort('userType')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                        <th>Last Active
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
                            <td style={{ display: 'flex', alignItems: 'center', gap: 4}}>
                                <Avatar src={avatar} alt="User Img" className='avatar'/>
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
