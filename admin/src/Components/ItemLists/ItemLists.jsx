import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import React from 'react';
import { Link } from 'react-router-dom';
import './itemlists.scss';
import {useEffect, useState} from 'react';

function ItemLists({ type }) {
    let data;
    const [count, setCount] = useState(0);

    useEffect(() => {
        switch (type) {
            case 'user':
                fetch('http://localhost:8000/learner')
                    .then((res) => res.json())
                    .then((data) => {
                        setCount(data.length);
                    });
                break;
            case 'videos':
                fetch('http://localhost:8000/video')
                    .then((res) => res.json())
                    .then((data) => {
                        setCount(data.length);
                    });
                break;
            case 'categories':
                fetch('http://localhost:8000/category')
                    .then((res) => res.json())
                    .then((data) => {
                        setCount(data.length);
                    });
                break;
            case 'tag':
                fetch('http://localhost:8000/tag')
                    .then((res) => res.json())
                    .then((data) => {
                        setCount(data.length);
                    });
                break;
            default:
                break;
        }
    },[]);


    // Dynamicaly change the ui content
    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                count: count,
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all users',
                linkto: '/users',
            };
            break;
        case 'videos':
            data = {
                title: 'VIDEOS',
                isMoney: false,
                count: count,

                icon: (
                    <LocalGroceryStoreOutlinedIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#FFF38C',
                        }}
                        className="icon"
                    />
                ),
                link: 'View all videos',
                linkto: '/videos',
            };
            break;
        case 'categories':
            data = {
                title: 'CATEGORIES',
                isMoney: false,
                count: count,
                icon: (
                    <AttachMoneyOutlinedIcon
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: '',
                linkto: '/categories',
            };
            break;
        case 'tag':
            data = {
                title: 'TAG',
                count: count,
                isMoney: false,
                icon: (
                    <PaidOutlinedIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#B1B2FF',
                        }}
                        className="icon"
                    />
                ),
                link: '',
                linkto: '/',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
            </div>

            <div className="counts">
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
