import React, { useState } from 'react';
import { Button, Select, MenuItem, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FacilityFilter = ({ onApply, onCancel }) => {
    const [period, setPeriod] = useState('');
    const [quarter, setQuarter] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleApply = () => {
        onApply({ period, quarter });
        setIsOpen(false);
    };

    const handleCancel = () => {
        setPeriod('');
        setQuarter('');
        onCancel();
        setIsOpen(false);
    };

    const handleReset = () => {
        setPeriod('');
        setQuarter('');
    };

    return (
        <Box>
            <Button onClick={() => setIsOpen(!isOpen)} sx={{ border: '1px solid rgba(217, 217, 217, 0.40)', borderRadius: '8px', textTransform: 'unset', fontFamily: 'Inter', fontWeight: '500', fontSize: '0.875rem', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', color: 'black', padding: '6px 12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_1214_51328)">
                        <path d="M5 10.625H15" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.875 6.875H18.125" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.125 14.375H11.875" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1214_51328">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>Filter
            </Button>
            {isOpen && (
                <Box sx={{
                    position: 'absolute',
                    zIndex: 1,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: '15px',
                    padding: '2rem',
                    width: 350,
                    right: '0',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '1.2rem' }}>Filter</Typography>
                        <Button sx={{ color: '#369D9C', fontFamily: 'Inter', fontWeight: '600', fontSize: '1rem', textTransform: 'unset', }} onClick={handleReset}>Reset all</Button>
                    </Box>
                    <Typography sx={{ mb: 1, fontWeight:'400',color:'#717171' }}>Period</Typography>
                    <Select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        fullWidth
                        displayEmpty
                        IconComponent={KeyboardArrowDownIcon}
                        placeholder="Period"
                        sx={{
                            margin: '0',
                            border: '1px solid rgba(217, 217, 217, 0.0)',
                            borderRadius: '5px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(217, 217, 217, 0.30)',
                            },
                            '& .MuiSelect-select': {
                                padding: '10px 16px',
                            },
                        }}
                    >
                        <MenuItem value="" disabled>
                            <span style={{ color: 'rgb(228 228 228)',fontSize:'0.875rem' }}>Period</span>
                        </MenuItem>
                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                        <MenuItem value="Yearly">Yearly</MenuItem>
                    </Select>

                    {period && (
                        <div style={{marginTop:'1.2rem'}}>
                            <Typography sx={{ mb: 1, fontWeight:'400',color:'#717171' }}>Quarter</Typography>
                            <Select
                                value={quarter}
                                onChange={(e) => setQuarter(e.target.value)}
                                fullWidth
                                displayEmpty
                                IconComponent={KeyboardArrowDownIcon}
                                placeholder="Period"
                                sx={{
                                    margin: '0',
                                    border: '1px solid rgba(217, 217, 217, 0.30)',
                                    borderRadius: '5px',
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(217, 217, 217, 0.30)',
                                    },
                                    '& .MuiSelect-select': {
                                        padding: '10px 16px',
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    <span style={{ color: 'rgb(228 228 228)',fontSize:'0.875rem' }}>Select Quarter</span>
                                </MenuItem>
                                <MenuItem value="Q1">Q1</MenuItem>
                                <MenuItem value="Q2">Q2</MenuItem>
                                <MenuItem value="Q3">Q3</MenuItem>
                                <MenuItem value="Q4">Q4</MenuItem>
                            </Select>
                        </div>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{ width: '48%', color: '#369d9c', border: '1px solid #369d9c', fontWeight: '500', textTransform: 'unset', borderRadius: '32px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleApply}
                            sx={{
                                backgroundColor: '#369D9C',
                                textTransform: 'none',
                                borderRadius: '52px',
                                padding: '0.4rem 1.8rem',
                                background: !period ? '#717171' : 'linear-gradient(102deg, #369D9C 0%, #28814D 100%)',
                                '&:hover': { backgroundColor: '#28814D' },
                                color: 'white',
                                width:'48%'
                            }}
                            disabled={!period}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default FacilityFilter;