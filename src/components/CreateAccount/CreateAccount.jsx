import React from 'react'
import TextField from '@mui/material/TextField';
import './CreateAccount.css';
import Radio from '@mui/material/Radio';
import Wrapper from '../Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';


export default function CreateAccount() {
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const navigate = useNavigate();

    return (
        <Wrapper>
            <div className='createacc'>
                <h1>Start creating your account</h1>
                <div className='input_fields'>
                    <div className='input'>
                        <p>Full Name</p>
                        <TextField id="outlined-size-small" label="" variant="outlined" size="small" fullWidth placeholder='Name' />
                    </div>
                    <div className='input'>
                        <p>Password</p>
                        <TextField id="outlined-size-small" label="" type="password" variant="outlined" size="small" fullWidth placeholder='Password' />
                    </div>
                    <div className='input'>
                        <p>Re-Enter Password</p>
                        <TextField id="outlined-size-small" label="" type="password" variant="outlined" size="small" fullWidth placeholder='Password' />
                    </div>
                </div>
                <div>
                    <Radio
                        checked={selectedValue === 'a'}
                        onChange={handleChange}
                        value="a"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    <span>I agree to the</span>{"  "}<span className='colored'>Terms and Conditions</span>
                </div>
                <button onClick={() => {
                    navigate('/organizationstepper');
                }}>Create Acccount</button>
            </div>
        </Wrapper>
    );
}
