import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

// import sass file
import './navbar.scss';

// import images
import admin from '../../Images/admin_pic.jpg';

function Navbar() {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <div className="navbar">
            <div className="navbar_main">
                <div className="search">
                    <input type="text" placeholder="Search.." />
                    <SearchIcon className="search_icon" />
                </div>

                <div className="item_lists">
                    <div className="item">
                        <NotificationsNoneIcon className="item_icon" />
                        <span className="badge">1</span>
                    </div>

                    <div className="item">
                        <img className="admin_pic" src={admin} alt="admin" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
