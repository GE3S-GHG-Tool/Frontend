import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './FacilityList.css';
import avatar from '../../../assets/images/userimg.png';

const facilityData = [
    { name: 'Royal Car Ltd', assigned: 'Aman Upadhyay', sector: 'Industry', industry: 'Manufacturing sector', country: 'India', address: 'Haryana, Gurgaon, Near station' },
    { name: 'Royal Car Ltd', assigned: 'Aman Upadhyay', sector: 'Industry', industry: 'Manufacturing sector', country: 'India', address: 'Punjab, Gas Station' },
    { name: 'Royal Car Ltd', assigned: 'Aman Upadhyay', sector: 'Industry', industry: 'Manufacturing sector', country: 'India', address: 'Haryana, Gurgaon, Near station' },
    { name: 'Royal Car Ltd', assigned: 'Aman Upadhyay', sector: 'Industry', industry: 'Manufacturing sector', country: 'India', address: 'Haryana, Gurgaon, Near station' },
];

const FacilityList = ({ searchQuery }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [sortedData, setSortedData] = useState(facilityData);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const handleSort = (columnKey) => {
        let direction = 'ascending';
        if (sortConfig.key === columnKey && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedArray = [...sortedData].sort((a, b) => {
            if (a[columnKey] < b[columnKey]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[columnKey] > b[columnKey]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedData(sortedArray);
        setSortConfig({ key: columnKey, direction });
    };

    const handleClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filteredMembers = facilityData.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.facility.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <table className="facility-table">
                <thead>
                    <tr>
                        <th>Facility Name
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Assigned
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Sector
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Industry
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Country
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Icon/CaretDoubleVertical">
                                    <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                        </th>
                        <th>Address
                            <button onClick={() => handleSort('address')} className="sort-button">
                                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon/CaretDoubleVertical">
                                        <path id="Vector" d="M8.25 4.25L6 2L3.75 4.25" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M8.25 8.75L6 11L3.75 8.75" stroke="#717171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((facility, index) => (
                        <tr key={index}>
                            <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <Avatar src={avatar} alt="User Img" />
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