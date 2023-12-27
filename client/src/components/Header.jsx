import React from "react";
import logoIcon from "../assets/images/logo2.png";
import avatar from "../assets/images/avatar.png";
import './header.css'
import {Link} from "react-router-dom";


export const Header = () => {
    const name = localStorage.getItem('username');
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
    const ShowOption = () => {
        const profile = document.querySelector('.right-item .profile');
        const logout = document.querySelector('.right-item .logout');
        console.log("z", profile);
        logout.classList.toggle('active');
        profile.classList.toggle('active');
    }
    
    return (
        <div className="header">
            <Link to="/">
                <div className="header-left">
                    <img alt='' src={logoIcon} className='logo'></img>
                </div>
            </Link>
            <div className="header-right">
                <Link to='/'>
                    <div className="header-right-item">Home</div>
                </Link>
                <Link to='/'>
                    <div className="header-right-item">Courses</div>
                </Link>
                <Link to='/'>
                    <div className="header-right-item">About</div>
                </Link>
                <div className="header-right-item user">
                    <Link to='/user'>

                        <div className="avatar">
                            <img src={avatar} alt={"Avatar"}></img>
                        </div>
                    </Link>
                    <div className="right-item">
                        <div className="name" onClick={ShowOption}>Hi, <span style={{color: "#000"}}>{name}</span></div>
                        <Link to='/user'>
                        <div className="profile">Profile</div>
                        </Link>
                        <div className="logout" onClick={handleLogOut}>Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;