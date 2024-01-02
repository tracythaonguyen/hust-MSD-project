import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./videoDescription.css";
import axios from "axios";
import * as Constant from "./Constant";
import startLesson from "../../assets/images/start_lesson.png";
import VideoPage from "../video/VideoPage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function (props) {
  const { videoID } = props.match.params;
  console.log({ videoID: videoID });

  const [VideoData, setVideoData] = useState({});
  const [FeedBack, setFeedBack] = useState({});
  const [thumbnail, setThumbnail] = useState(
    "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
  );
  const boxStyle = {
    background: `url('https://th.bing.com/th/id/R.81a3f59406b577c14dcbb0e139c3ffc0?rik=aQa6tM2bLkMiGw&riu=http%3a%2f%2fpicz.in%2fdata%2fmedia%2f7%2fSchool_BG_Classroom_6_by_TaskedAngelStock.jpg&ehk=WgjA7QvKAAQq8mbSc58ojqFSgzoKXh2UuUQ%2btTvk7F8%3d&risl=&pid=ImgRaw&r=0') center/cover`,
  };

  const getThumbnail = function (url, size) {
    let video, results;
    if (url == null) {
      return "";
    }

    size = size == null ? "big" : size;
    results = url.match("[\\?&]v=([^&#]*)");
    video = results == null ? url : results[1];

    if (size == "small") {
      return `http://img.youtube.com/vi/${video}/2.jpg`;
    }

    return `http://img.youtube.com/vi/${video}/0.jpg`;
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/video/" + videoID);
        setVideoData(res.data.data);
        console.log("VideoData: ", res.data.data);
        setThumbnail(VideoData);
      } catch (err) {
        console.log(err);
      }
    };
    getVideos().then((r) => console.log(r));
  }, []);
  useEffect(() => {
    const getVideos = async () => {
      try {
        setThumbnail(getThumbnail(VideoData.source_link, "big"));
      } catch (err) {
        console.log(err);
      }
    };
    getVideos().then((r) => console.log(r));
  }, [VideoData]);

  //   useEffect(() => {
  //     const getVideos = async () => {
  //       try {
  //         const res = await axios.get(
  //           "http://localhost:8000/feed/video/" + videoID
  //         );
  //         setFeedBack(res.data.data);
  //         console.log("VideoData: ", FeedBack);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getVideos().then((r) => console.log(r));
  //   }, [VideoData]);

  const handleClick = () => {};

  return (
    <div>
      <Header></Header>
      <div className="box-container">
        <div className="box" style={boxStyle}>
          {/* Image container on the left */}
          <div className="image-container">
            <img src={thumbnail} alt={"image"} />
          </div>
          {/* Text box on the right */}
          <div className="text-box">
            {/* Content goes here */}
            <h2>{VideoData.video_title}</h2>
            <h5>Level: {VideoData.level}</h5>

            <p>{VideoData.description}</p>
          </div>
        </div>
      </div>
      <div className="data-container">
        <div class="thumbnail-container">
          <img src={thumbnail} alt={"image"} className="thumbnail" />
          <div class="layer centered"></div>
          <div class="centered">
            <Link to={`/learn/${videoID}`}>
              <img
                src={startLesson}
                alt=""
                className="playImg"
                onClick={handleClick}
              />
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
