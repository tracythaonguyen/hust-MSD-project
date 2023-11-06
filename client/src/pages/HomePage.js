import React from 'react';
import { Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import BackgroundImage from '../assets/images/bg.png'


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
    console.log(1);
    return (

        <div className="text-center" style={HeaderStyle}>
            {isLogin == null ? (
                <LandingPage /> // Display LandingPage if logged in
            ) : (
                <React.Fragment>
                    <h1 className="main-title home-page-title">Welcome {username} to our app</h1>
                    <Link to="/">
                        <button className="primary-button" onClick={handleLogOut}>Log out</button>
                    </Link>
                </React.Fragment>
            )}
        </div>
    );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}