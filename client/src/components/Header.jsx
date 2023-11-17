import React from "react";
import logoIcon from "../assets/images/logo2.png";
import avatar from "../assets/images/avatar.png";
import './header.css'
import {Link} from "react-router-dom";


export const Header = () => {
    const name = "Linh";
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
                    <Link to='/'>

                        <div className="avatar">
                            <img src={avatar} alt={"Avatar"}></img>
                        </div>
                    </Link>
                    <div className="name"><span style={{color: "#5B5B5B"}}> Hi,</span> {name}</div>
                </div>
            </div>
        </div>
    );
}

export default Header;