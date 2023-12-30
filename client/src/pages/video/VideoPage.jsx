import React, { useEffect, useState, useRef } from "react";
import "./videoPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";
import IconClock from "../../assets/images/clock.png";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
export default function VideoPage({
  videoID,
  videoTitle,
  categoryId,
  level,
  sourceLink,
  description,
  linkImg,
}) {
  const [listTrack, setListTrack] = useState([]);
  const playerRefs = useRef({});
  const [displayTrack, setDisplayTrack] = useState(null);
  const [displayTrackID, setDisplayTrackID] = useState(null);
  const [playByTrack, setPlayByTrack] = useState(false);

  sourceLink = "https://www.youtube.com/watch?v=nPz-OXEVafM";
  videoID = 1;
  videoTitle = "Perry the Platypus plumber";

  let temp;
  // get all track of video
  useEffect(() => {
    axios
      .get("http://localhost:8000/track/" + videoID)
      .then((response) => {
        temp = Object.entries(response.data);
        console.log(temp);
        setListTrack(temp);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [videoID]);

  const playTrack = async (startTime, endTime) => {
    console.log(startTime);
    playerRefs.current[videoID].seekTo(startTime, "seconds");
    playerRefs.current[videoID].setState({ playing: false });
  };

  const handleProgress = (videoID) => (state) => {
    console.log("onProgress", state.playedSeconds);
    for (var i = 0; i < listTrack.length; i++) {
      if (
        state.playedSeconds > listTrack[i][1].start_time &&
        state.playedSeconds < listTrack[i][1].end_time &&
        listTrack[i][1].track_id != displayTrackID
      ) {
        setDisplayTrack(listTrack[i][1].transcript);
        setDisplayTrackID(listTrack[i][1].track_id);
        console.log(displayTrack);
      }
    }
  };

  return (
    <div className="videoPage">
      <div className="videoPageContainer">
        <div className="videoPageLeft">
          <Link to="/topic">
            <button className="backButton">
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </Link>

          <h4>Tracks</h4>
          <div className="tasksBar">
            {listTrack?.map((track) => (
              <button
                className="task active"
                onClick={() =>
                  playTrack(track[1].start_time, track[1].end_time)
                }
              >
                <img alt="book icon" src={MarkedBookWhiteIcon}></img>
                <div className="taskText"> Track {Number(track[0]) + 1}</div>
                <div className="taskTime">
                  {Math.floor(track[1].end_time - track[1].start_time)} s
                </div>
              </button>
            ))}
          </div>

          {/* <h4>Practice Quiz</h4>
          <div className="tasksBar">
            <button className="task active">
              <img alt="book icon" src={MarkedBookWhiteIcon}></img>
              <div className="taskText"> Lesson 01 : Introduction about XD</div>
              <div className="taskTime">30 mins</div>
            </button>
          </div> */}
        </div>

        <div className="videoPageRight">
          <div className="videoPageTop">
            <div className="videoPageTitle">{videoTitle}</div>
            <div className="videoTime">
              <img alt="clock icon" src={IconClock}></img>
              <p>1 hour</p>
            </div>
          </div>

          <div className="videoPageInfo">
            <div className="video">
              <ReactPlayer
                ref={(player) => (playerRefs.current[videoID] = player)}
                url={sourceLink}
                width="100%"
                height="100%"
                style={{ borderRadius: "20px" }}
                controls={false}
                playing={false}
                onProgress={handleProgress(videoID)}
              />
            </div>

            <div className="userScript">
              <p>{displayTrack}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
