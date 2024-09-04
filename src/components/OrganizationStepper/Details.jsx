import React from 'react'
import './Details.css'
import logo from '../../assets/images/ge3s_logo.png'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';


export default function Details({ activeStep, setActiveStep }) {
    const [age, setAge] = useState('');
    const [year, setYear] = useState('');
    const [baseMonth, setBaseMonth] = useState('');
    const [reportYear, setReportYear] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    }
    return (
        <div className='details'>
            <svg width="18" height="20" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setActiveStep(activeStep - 1)}>
                <path d="M15.4688 2.0625L2.53125 15L15.4688 27.9375" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='head_det'>
                <img src={logo} alt="" className='ge3s' />
                <h1>Time to enter your organization details </h1>
            </div>
            <div className='select_det'>
                <div className='para_select'>
                    <p>Start of Fiscal Year</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={year}
                            onChange={(event) => {
                                setYear(event.target.value);
                            }}
                            placeholder='Employee Count'
                            size='small'
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>2023</MenuItem>
                            <MenuItem value={2}>2022</MenuItem>
                            <MenuItem value={3}>2021</MenuItem>
                        </Select>
                    </FormControl>
                </div> <div className='para_select'>
                    <p>BaseLine Year</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            onChange={handleChange}
                            placeholder='Employee Count'
                            size='small'
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>India</MenuItem>
                            <MenuItem value={20}>America</MenuItem>
                            <MenuItem value={30}>UAE</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='select_det'>
                <div className='para_select'>
                    <p>First Reporting Year</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={reportYear}
                            onChange={(e) => {
                                setReportYear(e.target.value);
                            }}
                            size='small'
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>2023</MenuItem>
                            <MenuItem value={2}>2022</MenuItem>
                            <MenuItem value={3}>2021</MenuItem>
                        </Select>
                    </FormControl>
                </div> <div className='para_select'>
                    <p>BaseLine Month</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={baseMonth}
                            onChange={(e) => {
                                setBaseMonth(e.target.value);
                            }}
                            size='small'
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>February</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <button onClick={() => {
                setActiveStep(activeStep + 1);
            }}>Proceed</button>
        </div >
    )
}
