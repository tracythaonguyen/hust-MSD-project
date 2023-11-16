import Header from "../../components/Header";
import './topic.css'
import * as Constant from './Constant'

import React, { useState } from 'react';

export const TopicPage = () => {
    const boxStyle = {
        background: `url('${Constant.BACKGROUND_IMAGE}') center/cover`,
    };

    const smallBoxData = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        content: `Small Box ${index + 1}`,
    }));

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
                        <p>Change to Topic Description Here. The Image and Background Image also should take from Topic Data</p>
                    </div>
                </div>
            </div>
            {/*    DATA PART    */}
            <div className="big-box">
                <div className="small-box-container">
                    {visibleSmallBoxes.map((box) => (
                        <div key={box.id} className="small-box">
                            {box.content}
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button className="button" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button className="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopicPage;