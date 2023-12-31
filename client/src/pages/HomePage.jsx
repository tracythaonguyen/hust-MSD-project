import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import './HomePage.css';
import imgUrl from '../assets/images/ads.png';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


export default function HomePage() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [user, setUser] = useState({});
    //get user by token body
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/learner/get-learner-by-token/${token}`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser().then(r => console.log(r));
    }, [token]);

    //connect to API to get videos
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get("http://localhost:8000/video");
                setVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getVideos().then(r => console.log(r));
    }, []);


    //handle videos per page (Found your topic)
    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 2;

    const startIndex = currentPage * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = videos.slice(startIndex, endIndex);
    console.log("1", currentVideos);
    const handleNextPage = () => {
        if (currentPage < videos.length / videosPerPage - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    //get recent learning videos
    const [recentVideos, setRecentVideos] = useState([]);
    useEffect(() => {
        const getRecentVideos = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/video/getRecentLearningVideo/${user.learner_id}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );
                setRecentVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRecentVideos().then(r => console.log(r));
    }, [user]);

    //#region DEV: HOANG
    //#region -> Searching Functionalities
    const [searchTerm, setSearchTerm] = useState("");

    // search function with param is input text from search-term className
    const search = (searchTerm) => {
        console.log("Search Term: ", searchTerm);
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newVideoList = videos.filter((video) => {
                return Object.values(video)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            // debug
            console.log("Search Results: ", newVideoList);
            // Navigate to TopicPage with searchResults
            history.push({
                pathname: '/videoList',
                state: {initVideoListData: newVideoList},
            });
        } else {
            history.push({
                pathname: '/videoList',
                state: {initVideoListData: videos},
            });
        }
    }
    //#endregion

    //#endregion

    return (
        <div className="text-center" style={HeaderStyle}>
            {/* {token == null ? ( */}
            {(
                <React.Fragment>
                    <Header/>
                    <div className='content-container'>
                        <div className='top-content'>
                            <div className='search-group'>
                                <div className='search-box'>
                                    <input type="text" className='search-term'
                                           placeholder="Search your favourite course"
                                           value={searchTerm}
                                           onChange={(e) => setSearchTerm(e.target.value)}></input>
                                    <button type="submit" className='search-button'
                                            onClick={() => search(searchTerm)}>
                                        Search
                                    </button>
                                </div>

                                <div className='topic-group'>
                                    <button className='topic-item'>Popular</button>
                                    <button className='topic-item'>New</button>
                                    <button className='topic-item'>Categories</button>
                                    <button className='topic-item'>Search by</button>
                                </div>
                            </div>
                        </div>
                        <div className='advertisement'>
                            <div className='paragraph'>
                                <p className='p1'> By Group x in <span className='highlight'> ICT-K65</span></p>
                                <h1>Learn English online and improve your skills through our high-quality courses.</h1>
                                <p className='p2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed</p>
                                <button className='start-btn'>Start learning now</button>
                            </div>
                            <img alt='img' src={imgUrl} className='image'/>
                        </div>

                        <div className='middle-content'>
                            <div className='topic-heading'>
                                <h2>Found Your Listening Topic</h2>
                                <p className='see-all'> See all</p>
                            </div>
                            <div className='group-blog'>
                                {currentVideos.map((video) => (
                                    <div className='blog'>
                                        <img alt='img' src={video.link_img} className='blog-image'/>
                                        <h3>{video.video_title}</h3>
                                        <p className='p3'>{video.description}</p>
                                        <div className='blog-footer'>
                                            <p className='read-more'>Read more</p>
                                            <div className='view-count'>
                                                {video.view}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='nav'>
                                <button className='nav-btn btn-fail' onClick={handlePrevPage}> &lt; </button>
                                <button className='nav-btn' onClick={handleNextPage}> &gt; </button>
                            </div>
                        </div>
                        <div className='bottom-content'>
                            <div className='topic-heading'>
                                <h2>Recent Learning Videos</h2>
                                <p className='see-all'> See all</p>
                            </div>

                            <div className='video-group'>
                                {recentVideos.slice(0, 4).map((video) => (
                                    <div className='video'>
                                        <img alt='img' src={video.link_img} className='video-image'/>
                                        <div className='video-info'>
                                            <p className='topic-name'>{video.topic}</p>
                                            <p className='time'>{video.time}</p>
                                        </div>
                                        <h4>{video.video_title}</h4>
                                        <p className='p4'>{video.description}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <Footer/>
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