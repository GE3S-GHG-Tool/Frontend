import React from 'react'
import './Organization.css'
import logo from '../../assets/images/ge3s_logo.png'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Organization({ activeStep, setActiveStep }) {
    const [age, setAge] = useState('');
    const [employee, setEmployee] = useState('');

    const handleChange = (event) => {
        setEmployee(event.target.value);
    };
    const navigate = useNavigate();
    return (
        <div className='organzation'>
            <svg width="18" height="20" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    navigate('/createaccount');
                }}
            >
                <path d="M15.4688 2.0625L2.53125 15L15.4688 27.9375" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='heading'>
                <img src={logo} alt="" className='ge3s' />
                <h1>Time to enter your organization details </h1>
            </div>
            <p>Company Name</p>
            <div className='comp_name'>
                <TextField id="outlined-size-small" label="" variant="outlined" size="small" fullWidth placeholder='Company Name' />
            </div>
            <div className='select_emp_cou'>
                <div className='para_select'>
                    <p>Employee Count</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={employee}
                            onChange={handleChange}
                            placeholder='Employee Count'
                            size='small'
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>less than 20</MenuItem>
                            <MenuItem value={20}>21 - 50</MenuItem>
                            <MenuItem value={30}>51 - 100</MenuItem>
                            <MenuItem value={30}>101 - 200</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='para_select'>
                    <p>Country</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <p>Industry</p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <p>Sector</p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <button onClick={() => {
                setActiveStep(activeStep + 1);
            }}>Save & Next</button>
        </div>
    )
}
