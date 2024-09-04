import React from 'react'
import TextField from '@mui/material/TextField';
import "./SignUp.css"
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';

export default function SignUp() {

  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className='signup_page'>
        <h1>Welcome!</h1>
        <p className='descrip'>Produce Reports swiftly and effortlessly!</p>
        <div className='email_field'>
          <p>Email</p>
          <TextField id="outlined-size-small" label="" variant="outlined" size="small" fullWidth />
          <button onClick={() => navigate('/createaccount')}>Sign up</button>
        </div>
      </div>
    </Wrapper>

  )
}
