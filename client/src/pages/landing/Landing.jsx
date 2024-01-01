import React from 'react';
import './landing.css'
import Header from '../../assets/images/Header-landing.png'
import logoIcon from '../../assets/images/logo.svg'
import playIcon from '../../assets/images/play_icon.png'
import Footer from '../../components/Footer';
import {Link, useHistory} from 'react-router-dom'


export const Landing = () => {
    const history = useHistory();

    const login = () => {
        history.push("/login");
    }

    const register = () => {
        history.push("/register");
    }

    return (
        <div className='landingContainer'>
            <div className="landingHeader">
                <img alt='' src={Header} className='bg'></img>
                <div className="header-left">
                    <img alt='' src={logoIcon} className='logo'></img>
                </div>
                <div className="header-right">
                    <Link to='/login'>
                        <button className='login'>Login</button>
                    </Link>
                    <Link to='/register'>
                        <button className='register'>Register</button>
                    </Link>
                </div>

                <div className="header-body">
                    <div className="title">
                        <span className='title-color' style={{color: '#F48C06', marginRight: '10px'}}>Studying</span>
                        Online is now
                        <br></br> much easier
                    </div>
                    <div className="desc">
                        TOTC is an interesting platform that will teach<br></br> you in more an interactive way
                    </div>
                    <div className="header-button">
                        <button onClick={register} className="join-for-free">
                            Join for free
                        </button>

                        <div className="watch-work">
                            <img alt='' src={playIcon}></img>
                            <div className="watch-work_text">
                                Watch how it works
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default Landing

