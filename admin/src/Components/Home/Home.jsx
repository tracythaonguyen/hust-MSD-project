import React from 'react';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TableList/TableList';
import './Home.scss';

function Home() {
    //
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
    }
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />
                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="user" />
                    <ItemLists type="videos" />
                    <ItemLists type="categories" />
                    <ItemLists type="tag" />
                </div>

                <div className="table">
                    <div className="title">Latest Videos</div>
                    <TableList />
                </div>
            </div>

        </div>
    );
}

export default Home;
