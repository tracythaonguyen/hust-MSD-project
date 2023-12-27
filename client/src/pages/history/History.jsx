import Header from "../../components/Header";
import "./history.css";
import CameraIcon from "../../assets/images/add-camera_icon.png";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
export const History = () => {
  const user = {
    name: "Nguyen Van A",
    email: "linhshark02@gmail.com",
    birthdate: "01/01/2000",
    phone: "0123456789",
    address: "Ha Noi",
    avatar:
      "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/hinh-avatar-anh-dai-dien-FB-mac-dinh.jpg?fit\u003d560%2C560\u0026ssl\u003d1",
    occupation: "Student",
    location: "Phuong Trung, Thanh Oai, Ha Noi",
  };

  const smallBoxData = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Small Box ${index + 1}`,
    image: `https://via.placeholder.com/150`,
    progress: (index + 1) * 10, // Set progress value based on your data
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
                    <img src={box.image} alt={box.name} />
                    <div className="small-box-content">
                      <div className="small-box-name">{box.name}</div>
                      <div className="percentage-text">{box.progress}%</div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-inner"
                        style={{ width: `${box.progress}%` }}
                      />
                    </div>
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
