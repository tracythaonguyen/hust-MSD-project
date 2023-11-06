import React from 'react';
import './landing.css'
import Header from '../../assets/images/Header-landing.png'
import logo from '../../assets/images/logo.svg'



export const Landing = () => {
    return (
        <div>
            <div className="landingHeader">
                <img src={Header} className='bg'></img>
                <div className="header-left">
                    <img src={logo} className='logo'></img>
                </div>
                <div className="header-right">
                        <button className='login'>Login</button>
                        <button className='register'>Register</button>
                    </div>
            </div>
            <div className="landingContainer">
                <div className="landing-top">
                    
                </div>
            </div>
            <h1>Footer</h1>
        </div>
    )
}

export default Landing

