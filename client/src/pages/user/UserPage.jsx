import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import "./userPage.css";
import CameraIcon from "../../assets/images/add-camera_icon.png";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import {useUser} from "../../components/UserContext";

export const UserPage = () => {
  const [user, setUser] = useState(useUser());
  const token = localStorage.getItem("token");
  //get account by token
  const [account, setAccount] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  useEffect(() => {
    const getAccount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/account/get-account-by-token/${token}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAccount();
  }, [user]);

    const avatarLink =
        "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/hinh-avatar-anh-dai-dien-FB-mac-dinh.jpg?fit\u003d560%2C560\u0026ssl\u003d1";
    const handleUpdateUser = () => {
        //update user
        console.log("data to update", user);
        axios
            .put(
                `http://localhost:8000/learner/update-learner/${user.learner_id}`,
                user,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        //update account
        axios
            .put(
                `http://localhost:8000/account/update-account/${account.account_id}`,
                account,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        const saveBtn = document.querySelector(".saveBtn");
        saveBtn.style.display = "none";
    };
    const handleInputLearnerChange = (e) => {
        // Update the user state when input changes
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputAccountChange = (e) => {
        // Update the user state when input changes
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditMode = () => {
        const saveBtn = document.querySelector(".saveBtn");
        saveBtn.style.display = "block";
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
          <Link to="/history">
            <button className="task task-2">
              <img alt="book icon" src={MarkedBookIcon}></img>
              <div className="taskText">Video History Page</div>
            </button>
          </Link>
          <Link to="/favourite">
            <button className="task task-3">
              <img alt="book icon" src={MarkedBookIcon}></img>
              <div className="taskText">Video Favourite Page</div>
            </button>
          </Link>
          <button className="task task-4">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Something Page</div>
          </button>
        </div>

        {user && (
          <div className="userContent">
            <div className="contentHeader">
              <button className="editInfo" onClick={handleEditMode}>
                Edit Information
              </button>
              <div className="avatarContainer">
                <img alt="avatar" src={avatarLink} className="avatar"></img>
                <img
                  alt="camera icon"
                  src={CameraIcon}
                  className="cameraIcon"
                ></img>
                <p className="name">
                  {account.first_name} {account.last_name}
                </p>
              </div>
            </div>

                        <div className="contentBody">
                            <div className="infoContainer">
                                <div className="infos">
                                    <div className="info">
                                        <label className="infoLabel">First Name</label>
                                        <input
                                            placeholder={account.first_name}
                                            type="text"
                                            className="inputText"
                                            name="first_name"
                                            onChange={handleInputAccountChange}
                                        ></input>
                                    </div>
                                    <div className="info">
                                        <label className="infoLabel">Last</label>
                                        <input
                                            placeholder={account.last_name}
                                            type="text"
                                            className="inputText"
                                            name="last_name"
                                            onChange={handleInputAccountChange}
                                        ></input>
                                    </div>
                                </div>
                                <div className="infos">
                                    <div className="info">
                                        <label className="infoLabel">Birthdate</label>
                                        <input type="date" className="inputDate" name="dob"></input>
                                    </div>
                                    <div className="info">
                                        <label className="infoLabel">Occupation</label>
                                        <input
                                            placeholder={user.occupation}
                                            type="text"
                                            className="inputText"
                                            name="occupation"
                                            onChange={handleInputLearnerChange}
                                        ></input>
                                    </div>
                                </div>
                                <div className="infos">
                                    <div className="info">
                                        <label className="infoLabel">Location</label>
                                        <input
                                            placeholder={user.address}
                                            type="text"
                                            className="inputText"
                                            name="address"
                                            onChange={handleInputLearnerChange}
                                        ></input>
                                    </div>
                                </div>

                                <div className="infos">
                                    <div className="info">
                                        <label className="infoLabel">Phone number</label>
                                        <input
                                            type="text"
                                            placeholder={user.phone_number}
                                            className="inputText"
                                            name="phone_number"
                                            onChange={handleInputLearnerChange}
                                        ></input>
                                    </div>
                                    <div className="info">
                                        <label className="infoLabel">Email</label>
                                        <input
                                            placeholder={account.email}
                                            type="text"
                                            className="inputText"
                                            name="email"
                                            onChange={handleInputAccountChange}
                                        ></input>
                                    </div>
                                </div>

                                <button className="saveBtn" onClick={handleUpdateUser}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
