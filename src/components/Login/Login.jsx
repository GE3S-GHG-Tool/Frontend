import React from 'react'
import TextField from '@mui/material/TextField';
import './Login.css'
import logo from '../../assets/images/ge3s.png'
import Wrapper from '../Wrapper/Wrapper';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <div className='login'>
                <img src={logo} alt="" className='ge3s_logo' />
                <h1>Generate reports quick and easy!</h1>
                <div className='input_login'>
                    <p>Email</p>
                    <TextField id="outlined-size-small" label="" variant="outlined" size="small" fullWidth placeholder='Text' />
                </div>
                <div className='input_login'>
                    <p>Password</p>
                    <TextField id="outlined-size-small" label="" type="password" variant="outlined" size="small" fullWidth placeholder='Password' />
                </div>
                <button onClick={() => {
                    navigate('/organizationstepper')
                }}>Login</button>

            </div>
        </Wrapper>
    )
}
