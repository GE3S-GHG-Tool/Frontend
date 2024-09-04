import React from 'react'
import './Wrapper.css'
import logotop from '../../assets/images/topright.png'
import logobottom from '../../assets/images/bottomleft.png'


export default function Wrapper({ children }) {
    return (
        <div className='wrapper'>
            <img src={logotop} alt="" className='topimg' />
            {children}
            <img src={logobottom} alt="" className='bottomimg' />
        </div>
    )
}
