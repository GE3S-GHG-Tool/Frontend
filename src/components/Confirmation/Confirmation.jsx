import React from 'react'
import './Confirmation.css'
import Wrapper from '../Wrapper/Wrapper'

export default function Confirmation() {
    return (
        <Wrapper>
            <div className='confirm'>
                <div className='crossbtn'>
                    <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="X">
                            <path id="Vector" d="M25.7081 24.2925C25.801 24.3854 25.8747 24.4957 25.9249 24.6171C25.9752 24.7385 26.0011 24.8686 26.0011 25C26.0011 25.1314 25.9752 25.2615 25.9249 25.3829C25.8747 25.5043 25.801 25.6146 25.7081 25.7075C25.6151 25.8004 25.5048 25.8741 25.3835 25.9244C25.2621 25.9747 25.132 26.0006 25.0006 26.0006C24.8692 26.0006 24.7391 25.9747 24.6177 25.9244C24.4963 25.8741 24.386 25.8004 24.2931 25.7075L16.0006 17.4138L7.70806 25.7075C7.52042 25.8951 7.26592 26.0006 7.00056 26.0006C6.73519 26.0006 6.4807 25.8951 6.29306 25.7075C6.10542 25.5199 6 25.2654 6 25C6 24.7346 6.10542 24.4801 6.29306 24.2925L14.5868 16L6.29306 7.70751C6.10542 7.51987 6 7.26537 6 7.00001C6 6.73464 6.10542 6.48015 6.29306 6.29251C6.4807 6.10487 6.73519 5.99945 7.00056 5.99945C7.26592 5.99945 7.52042 6.10487 7.70806 6.29251L16.0006 14.5863L24.2931 6.29251C24.4807 6.10487 24.7352 5.99945 25.0006 5.99945C25.2659 5.99945 25.5204 6.10487 25.7081 6.29251C25.8957 6.48015 26.0011 6.73464 26.0011 7.00001C26.0011 7.26537 25.8957 7.51987 25.7081 7.70751L17.4143 16L25.7081 24.2925Z" fill="black" />
                        </g>
                    </svg>
                </div>
                <div className='confirmtick'>
                    <svg width="90" height="90" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="56.5" cy="56.5" r="56" fill="url(#paint0_linear_939_5057)" />
                        <path d="M34.0957 56.3002L49.0854 71.29L78.9071 41.4683" stroke="white" stroke-width="8.83606" />
                        <defs>
                            <linearGradient id="paint0_linear_939_5057" x1="0.5" y1="0.5" x2="130.171" y2="27.4392" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#51ADAC" />
                                <stop offset="1" stop-color="#4FA874" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <p>Your account has been created sucessfully </p>
                <button>Continue</button>
            </div>
        </Wrapper>
    )
}
