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
import FillInTheBlankQuiz from "../../components/Quiz";
import { useUser } from "../../components/UserContext";

function VideoPage(props) {
  const [listTrack, setListTrack] = useState([]);
  const playerRefs = useRef({});
  const [displayingTrack, setDisplayTrack] = useState(null);
  const [displayingTrackID, setDisplayTrackID] = useState(null);
  const [playByTrack, setPlayByTrack] = useState(false);
  const [playingStates, setPlayingStates] = useState();
  const [stopTime, setStopTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [IDtrackChosen, setIDTrackChosen] = useState(null);
  const [trackIndexChosen, setTrackIndexChosen] = useState(null);

  const token = localStorage.getItem("token");
  const [user, setUser] = useState(useUser());

  const [videoTitle, setVideoTitle] = useState(null);
  const [sourceLink, setSourceLink] = useState(null);

  const { videoID } = props.match.params;
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/video/" + videoID);
        setVideoData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getVideos().then((r) => console.log(r));
  }, [videoID]);

  useEffect(() => {
    // Actions dependent on state updates
    if (videoData) {
      setSourceLink(videoData.source_link);
      setVideoTitle(videoData.video_title);
    }
  }, [videoData]);

  let temp;

  // get all track of video by videoID
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
  }, []);

  const playTrack = async (trackIndex, trackID, startTime, endTime) => {
    // console.log(startTime);
    setStopTime(endTime);
    setStartTime(startTime);
    setTrackIndexChosen(trackIndex);
    setIDTrackChosen(trackID);
    playerRefs.current[videoID].seekTo(startTime, "seconds");
    setPlayingStates(true);
  };

  const handleProgress = (videoID) => (state) => {
    if (state.playedSeconds > stopTime) {
      setPlayingStates(false);
      playerRefs.current[videoID].seekTo(startTime, "seconds");
    }

    for (var i = 0; i < listTrack.length; i++) {
      if (
        state.playedSeconds > listTrack[i][1].start_time &&
        state.playedSeconds < listTrack[i][1].end_time &&
        listTrack[i][1].track_id != displayingTrackID
      ) {
        setDisplayTrack(listTrack[i][1].transcript);
        setDisplayTrackID(listTrack[i][1].track_id);
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
                  playTrack(
                    Number(track[0]),
                    track[1].track_id,
                    track[1].start_time,
                    track[1].end_time
                  )
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
        </div>

        <div className="videoPageRight">
          <div className="videoPageTop">
            <div className="videoPageTitle">{videoTitle}</div>
            <div className="videoTime">
              <img alt="clock icon" src={IconClock}></img>
              {/* <p>1 hour</p> */}
            </div>
          </div>
          {sourceLink != null && (
            <div className="videoPageInfo">
              <div className="video">
                <ReactPlayer
                  ref={(player) => (playerRefs.current[videoID] = player)}
                  url={sourceLink}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "20px" }}
                  controls={false}
                  playing={playingStates}
                  onProgress={handleProgress(videoID)}
                />
              </div>
              {trackIndexChosen != null && (
                <div className="userScript">
                  <FillInTheBlankQuiz
                    transcript={listTrack[trackIndexChosen][1].transcript}
                    video_id={videoID}
                    track_id={IDtrackChosen}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
