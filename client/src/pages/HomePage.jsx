import React from 'react';
import Landing from './landing/Landing';
import Header from "../components/Header";
import Footer from '../components/Footer';
import './HomePage.css';
import imgUrl from '../assets/images/ads.png';
import axios from 'axios';
import { useState, useEffect } from 'react';



export default function HomePage() {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
    const isLogin = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    // console.log("token", isLogin);
    // console.log("username", username);


    //connect to API to get videos
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
     
    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get("http://localhost:8000/video");
                setVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getVideos();
    }, []);


    //handle videos per page (Found your topic)
    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 2;

    const startIndex = currentPage * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = videos.slice(startIndex, endIndex);
    console.log("1",currentVideos);
    const handleNextPage = () => {
        if(currentPage < videos.length / videosPerPage - 1){
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="text-center" style={HeaderStyle}>
            {/* {isLogin == null ? ( */}
            {false ? (
                <Landing /> // Display LandingPage if logged in
            ) : (
                <React.Fragment>
                    <Header />
                    <div className='content-container'>
                        <div className='top-content'>
                            <div className='search-group'>
                                <div className='search-box'>
                                    <input type="text" className='search-term' placeholder="Search your favourite course"></input>
                                    <button type="submit" className='search-button'>
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
                                <p className='p1'> By Group x in <span className='highlight'> ICT-K65</span> </p>
                                <h1>Learn English online and improve your skills through our high-quality courses.</h1>
                                <p className='p2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed</p>
                                <button className='start-btn'>Start learning now</button>
                            </div>
                            <img alt='img' src={imgUrl} className='image' />
                        </div>

                        <div className='middle-content'>
                            <div className='topic-heading'>
                                <h2>Found Your Listening Topic</h2>
                                <p className='see-all'> See all</p>
                            </div>
                            <div className='group-blog'>
                                {currentVideos.map((video) => (
                                    <div className='blog'>
                                        <img alt='img' src={imgUrl} className='blog-image' />
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
                                {/* <div className='blog'>
                                    <img alt='img' src={imgUrl} className='blog-image' />
                                    <h3>Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution</h3>
                                    <p className='p3'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                                    <div className='blog-footer'>
                                        <p className='read-more'>Read more</p>
                                        <div className='view-count'>
                                            200,000
                                        </div>
                                    </div>
                                </div>
                                <div className='blog'>
                                    <img alt='img' src={imgUrl} className='blog-image' />
                                    <h3>Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution</h3>
                                    <p className='p3'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                                    <div className='blog-footer'>
                                        <p className='read-more'>Read more</p>
                                        <div className='view-count'>
                                            200,000
                                        </div>
                                    </div>
                                </div> */}
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
                                <div className='video'>
                                    <img alt='img' src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                                <div className='video'>
                                    <img alt='img' src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                                <div className='video'>
                                    <img alt='img' src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                                <div className='video'>
                                    <img alt='img' src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                            </div>
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