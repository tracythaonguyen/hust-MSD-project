import React from 'react';
import { Link } from 'react-router-dom';
import Landing from './landing/Landing';
import BackgroundImage from '../assets/images/bg.png'
import Header from "../components/Header";
import Footer from '../components/Footer';
import './HomePage.css'



export default function HomePage() {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
    const isLogin = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    console.log("token", isLogin);
    console.log("username", username);
    return (
        <div className="text-center" style={HeaderStyle}>
            {isLogin == null ? (
                <Landing /> // Display LandingPage if logged in
            ) : (
                <React.Fragment>
                    <Header />
                    <div className='content-container'>
                        <div className='top-content'>
                            <div className='search-group'>
                                <div className='search-box'>
                                    Search your favourite course

                                </div>
                            </div>
                        </div>

                        <div className='advertisement'>
                            <p>abc</p>
                        </div>
                    </div>
                    <Footer />
                </React.Fragment>
            )}
        </div>
    );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    // background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}