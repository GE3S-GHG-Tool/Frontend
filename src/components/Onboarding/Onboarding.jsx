import React from 'react'
import logotop from '../../assets/images/topright.png'
import logobottom from '../../assets/images/bottomleft.png'
import "./Onboarding.css"
import SignUp from '../SignUp/SignUp'
import CreateAccount from '../CreateAccount/CreateAccount'
import Confirmation from '../Confirmation/Confirmation'
import Login from '../Login/Login'

export default function Onboarding() {
    return (
        <div className='onboard'>
            <div className='imagesty'>
                <img src={logotop} alt="" className='topimg' />
            </div>
            {/* <SignUp/> */}
            {/* <CreateAccount/> */}
            {/* <Confirmation/> */}
            {/* <Login/> */}
            <div className='imagesty'>
                <img src={logobottom} alt="" className='bottomimg' />
            </div>
        </div>
    )
}
