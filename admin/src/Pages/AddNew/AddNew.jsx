/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import noImage from "../../Images/photo-camera.png";
import "./New.scss";
import axios from "axios";

function AddNew({ inputs, titlee, type }) {
  let dynamicInpVal;

  // dynamically change the state values
  switch (type) {
    case "USER":
      dynamicInpVal = {
        username: "",
        name: "",
        email: "",
        password: "",
        address: "",
      };
      break;
    case "VIDEO":
      dynamicInpVal = {
        video_title: "",
        description: "",
        category: "",
        source_link: "",
        link_img: "",
        level: "",
      };
      break;
    case "BLOG":
      dynamicInpVal = {
        title: "",
        description: "",
        tags: "",
      };
      break;
    default:
      break;
  }
  const [userInp, setUserInp] = useState(dynamicInpVal);

  const [file, setFile] = useState("");

  const image = false;

  // Dynamicaly change the data for different pages
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the input is a select element, set the value based on the selected option
    if (e.target.tagName.toLowerCase() === 'select') {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];
      setUserInp((prevUserInp) => ({
        ...prevUserInp,
        [name]: selectedOption.value,
      }));
    } else {
      setUserInp((prevUserInp) => ({ ...prevUserInp, [name]: value }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    //post request to api to create new video
    const res = axios.post(`http://localhost:8000//${type}`, userInp);
    console.log("zzz",userInp);
  };
  return (
    <div className="add_new">
      <div className="home_sidebar">
        <Sidebar />
      </div>

      <div className="new_page">
        <Navbar />

        <div className="new_page_main">
          <div className="new_page_content">
            <div className="image">
              <p className="add_new_user">{titlee}</p>
              {/* <img src={file ? URL.createObjectURL(file) : noImage} alt="" /> */}
            </div>

            <form onSubmit={handleSubmit} className="form">
            {inputs.map((detail) =>
  detail.type === "select" ? (
    <div key={detail.id}>
      <label>{detail.lable}</label>
      <select
        {...detail}
        value={userInp[detail.name]}
        onChange={handleChange}
      >
        {detail.options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <Input
      key={detail.id}
      {...detail}
      value={userInp[detail.name]}
      onChange={handleChange}
    />
  )
)}
              <button type="submit" className="submit_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNew;
