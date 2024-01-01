import Header from "../../components/Header";
import "./history.css";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import useFetchUser from "../../utilities/useFetchUser";
import useFetchRecentVideos from "../../utilities/useFetchRecentVideos";

export const History = () => {
    // const [recentVideos, setRecentVideos] = useState([]);
    const token = localStorage.getItem("token");
    //get user by token body
    const user = useFetchUser(token);
    const recentVideos = useFetchRecentVideos(user, token);

    const smallBoxData = recentVideos.map((video, index) => ({
        id: video.video_id,
        name: video.video_title,
        image: video.link_img,
        progress: (index + 1) * 10, // Set progress value based on your data),
        date: new Date(video.click_time).toLocaleDateString('en-US'),
        time: new Date(video.click_time).toLocaleTimeString('en-US'),
    }));

    const itemsPerPage = 6;
    const totalPages = Math.ceil(smallBoxData.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) =>
            prevPage < totalPages ? prevPage + 1 : prevPage
        );
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleSmallBoxes = smallBoxData.slice(startIndex, endIndex);

    return (
        <div className="historyPage">
            <Header></Header>
            <div className="historyContainer">
                <div className="tasksBar">
                    <Link to="/user">
                        <button className="task task-1">
                            <img alt="book icon" src={MarkedBookIcon}></img>
                            <div className="taskText">Information Page</div>
                        </button>
                    </Link>
                    <button className="task task-2">
                        <img alt="book icon" src={MarkedBookWhiteIcon}></img>
                        <div className="taskText">Video History Page</div>
                    </button>
                    <button className="task task-3">
                        <img alt="book icon" src={MarkedBookIcon}></img>
                        <div className="taskText">Video Favourite Page</div>
                    </button>
                    <button className="task task-4">
                        <img alt="book icon" src={MarkedBookIcon}></img>
                        <div className="taskText">Something Page</div>
                    </button>
                </div>

                <div className="historyContent">
                    <div className="contentHeader">
                        <h1 className="contentTitle">Video History</h1>
                    </div>

                    <div className="contentBody">
                        {/*    DATA PART    */}
                        <div className="big-box">
                            <div className="small-box-container">
                                {visibleSmallBoxes.map((box) => (
                                    <Link
                                        key={box.id}
                                        to={`/video/${box.id}`}
                                        className="small-box"
                                    >
                                        <img src={box.image} alt={box.name}/>
                                        <div className="small-box-content">
                                            <div className="small-box-name">{box.name}</div>
                                            <div className="percentage-text">{box.progress}%</div>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-bar-inner"
                                                style={{width: `${box.progress}%`}}
                                            />
                                        </div>
                                        <div className="small-text">Recently watch: {box.date}, {box.time}</div>
                                    </Link>
                                ))}
                            </div>
                            <div className="button-container">
                                <button
                                    className="button"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                <button
                                    className="button"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
