import React, {useEffect, useState} from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TableList/TableList';
import userPic from '../../Images/man2.jpg';
import './Detail.scss';


function Detail() {
    // get user id from url
    const url = window.location.href.split('/');
    const userId = url[url.length - 1];
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('userId', userId);
        const getUser = async () => {
            try {
                const res = await fetch(`http://localhost:8000/learner/${userId}`);
                const userData = await res.json();
                setUser(userData);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
        getUser().then(r => console.log(r));
        // log user data
        console.log('user: ', user);
    }, []);

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="user_info">
                    <div className="user_detail">
                        {/*<img src={userPic} alt="user" className="user_image" />*/}

                        {/*if data is null*/}
                        {user !== null ? (
                            <div className="user_detailss">
                                <p className="name">Learner ID: {user.data.learner_id}</p>
                                <p>Account ID: {user.data.account_id}</p>
                                <p>Date of birth: {user.data.dob}</p>
                                <p>Occupation: {user.data.occupation}</p>
                                <p>Address: {user.data.address}</p>
                                <p>Phone number: {user.data.phone_number}</p>
                                <p>Total score: {user.data.total_score}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>

                {/*<div className="table">*/}
                {/*    <div className="title">Last Transactions</div>*/}
                {/*    <TableList />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Detail;
