// Module
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
// CSS
import './VideoListStyle.css'
// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import * as Constant from './Constant'


export const VideoListPage = () => {
    const location = useLocation();
    const initVideoListData = location.state && location.state.initVideoListData;
    let smallBoxData = [];

    // Convert initVideoListData to smallBoxData
    if (initVideoListData !== undefined && initVideoListData.length !== 0) {
        console.log("Search results: " + initVideoListData);
        smallBoxData = initVideoListData.map((searchResult) => ({
            id: searchResult.id,
            name: searchResult.video_title,
            image: searchResult.link_img,
            // progress: searchResult.progress,
        }));
    }

    const boxStyle = {
        background: `url('${Constant.BACKGROUND_IMAGE}') center/cover`,
    };

    const itemsPerPage = 6;
    const totalPages = Math.ceil(smallBoxData.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleSmallBoxes = smallBoxData.slice(startIndex, endIndex);

    return (
        <div className="topicPage">
            <Header></Header>
            {/*    TOPIC PART    */}
            <div className="box-container">
                <div className="box" style={boxStyle}>
                    {/* Image container on the left */}
                    <div className="image-container">
                        <img src={Constant.TOPIC_LOGO} alt={"image"}/>
                    </div>
                    {/* Text box on the right */}
                    <div className="text-box">
                        {/* Content goes here */}
                        <h2>Change to Topic Name Here</h2>
                        <p>Change to Topic Description Here. The Image and Background Image also should take from Topic
                            Data</p>
                    </div>
                </div>
            </div>
            {/*    DATA PART    */}
            <div className="big-box">
                <h2>TOPIC</h2>
                <br/>
                <div className="small-box-container">
                    {visibleSmallBoxes.map((box) => (
                        <Link key={box.id} to={`/video/${box.id}`} className="small-box">
                            <img src={box.image} alt={box.name}/>
                            <div className="small-box-content">
                                <div className="small-box-name">{box.name}</div>
                                {/*<div className="percentage-text">{box.progress}%</div>*/}
                            </div>
                            {/*<div className="progress-bar">*/}
                            {/*    <div*/}
                            {/*        className="progress-bar-inner"*/}
                            {/*        style={{width: `${box.progress}%`}}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </Link>
                    ))}
                </div>
                <div className="button-container">
                    {/*Only show if the number of small box > item per page*/}
                    {smallBoxData.length > itemsPerPage && (
                        <div className="pagination">
                            <button className="button" onClick={handlePrevPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <button className="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default VideoListPage;