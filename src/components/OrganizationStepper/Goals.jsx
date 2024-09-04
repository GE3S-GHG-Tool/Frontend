import React from 'react'
import './Goals.css'
import Radio from '@mui/material/Radio';
import logo from '../../assets/images/ge3s_logo.png'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function Goals({ activeStep, setActiveStep }) {
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [age, setAge] = React.useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const onChange = (event) => {
        setAge(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });
    return (
        <div className='goals'>
            <svg width="18" height="20" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
                setActiveStep(activeStep - 1);
            }}>
                <path d="M15.4688 2.0625L2.53125 15L15.4688 27.9375" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='head_det'>
                <img src={logo} alt="" className='ge3s' />
                <h1>Time to enter your organization details </h1>
            </div>
            <div className='para_select_det'>
                <p>Start of Fiscal Year</p>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={age}
                        onChange={onChange}
                        placeholder='Employee Count'
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>I want to make my Organization more Green</MenuItem>
                        <MenuItem value={2}>My Investors are asking for a report</MenuItem>
                        <MenuItem value={3}>I want to make sustainability claims</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <p>Have you ever calculated carbon footprint before ?</p>
            <div className='options'>
                <div className='para_rad'>
                    <Radio
                        {...controlProps('e')}
                        sx={{
                            color: green[800],
                            '&.Mui-checked': {
                                color: green[600],
                            },
                        }}
                    />
                    <h1>No,Never</h1>
                </div>
                <div className='para_rad'>
                    <Radio
                        {...controlProps('f')}
                        sx={{
                            color: green[800],
                            '&.Mui-checked': {
                                color: green[600],
                            },
                        }}
                    />
                    <h1>Once or Twice</h1>
                </div>
                <div className='para_rad'>
                    <Radio
                        {...controlProps('g')}
                        sx={{
                            color: green[800],
                            '&.Mui-checked': {
                                color: green[600],
                            },
                        }}
                    />
                    <h1>Ferquently</h1>
                </div>
            </div>
            <button onClick={() => {
                navigate('/confirmation');
            }}>Next</button>
        </div>
    )
}
