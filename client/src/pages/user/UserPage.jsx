import React from "react";
import Header from "../../components/Header";
import "./userPage.css";
import CameraIcon from "../../assets/images/add-camera_icon.png";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";

export const UserPage = () => {
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
  return (
    <div className="userPage">
      <Header></Header>
      <div className="userContainer">
        <div className="tasksBar">
          <button className="task task-1">
            <img alt="book icon" src={MarkedBookWhiteIcon}></img>
            <div className="taskText">Information Page</div>
          </button>
          <button className="task task-2">
            <img alt="book icon" src={MarkedBookIcon}></img>
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

        <div className="userContent">
          <div className="contentHeader">
            <button className="editInfo">Edit Information</button>
          </div>
          <div className="contentBody">
            <div className="avatarContainer">
              <img alt="avatar" src={user.avatar} className="avatar"></img>
              <img
                alt="camera icon"
                src={CameraIcon}
                className="cameraIcon"
              ></img>
              <p className="name">{user.name}</p>
            </div>

            <div className="infoContainer">
              <div className="infos">
                <label className="infoLabel">Full Name</label>
                <input
                  placeholder={user.name}
                  type="text"
                  className="inputText"
                ></input>
              </div>
              <div className="infos">
                <div className="info">
                  <label className="infoLabel">Birthdate</label>
                  <input type="date" className="inputDate"></input>
                </div>
                <div className="info">
                  <label className="infoLabel">Occupation</label>
                  <input
                    placeholder={user.occupation}
                    type="text"
                    className="inputText"
                  ></input>
                </div>
              </div>
              <div className="infos">
                <label className="infoLabel">Location</label>
                <input
                  placeholder={user.location}
                  type="text"
                  className="inputText"
                ></input>
              </div>

              <div className="infos">
                <div className="info">
                  <label className="infoLabel">Phone number</label>
                  <input
                    type="text"
                    placeholder={user.phone}
                    className="inputText"
                  ></input>
                </div>
                <div className="info">
                  <label className="infoLabel">Occupation</label>
                  <input
                    placeholder={user.occupation}
                    type="text"
                    className="inputText"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
