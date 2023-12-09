import React from "react";
import "./videoPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkedBookIcon from "../../assets/images/marked-book_icon.png";
import MarkedBookWhiteIcon from "../../assets/images/marked-book-white_icon.png";
import IconClock from "../../assets/images/clock.png";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function VideoPage() {
  return (
    <div className="videoPage">
      <div className="videoPageContainer">
        <div className="videoPageLeft">
          <button className="backButton">
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>

          <h4>Tracks</h4>
        <div className="tasksBar">
          <button className="task active">
            <img alt="book icon" src={MarkedBookWhiteIcon}></img>
            <div className="taskText"> Track 01 : Introduction</div>
            <div className="taskTime">30 mins</div>
          </button>
          <button className="task">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Track 02 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
          <button className="task">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Track 03 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
          <button className="task">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Track 04 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
        </div>

        <h4>Practice Quiz</h4>
        <div className="tasksBar">
          <button className="task active">
            <img alt="book icon" src={MarkedBookWhiteIcon}></img>
            <div className="taskText"> Lesson 01 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
          <button className="task">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Lesson 02 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
          <button className="task">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Lesson 03 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
          <button className="task">
            <img alt="book icon" src={MarkedBookIcon}></img>
            <div className="taskText">Lesson 04 : Introduction about XD</div>
            <div className="taskTime">30 mins</div>
          </button>
        </div>
        </div>

       
        <div className="videoPageRight">
            <div className="videoPageTop">
                <div className="videoPageTitle">Learn about Adobe XD & Prototyping
                </div>
                <div className="videoTime">
                  <img alt="clock icon" src={IconClock}></img>
                </div>
                <p>1 hour</p>
            </div>

            <div className="videoPageInfo">
                <div className="video">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/4KqjNiw2Zq4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>

                <div className="userScript">
                  <p>Lorem ipsum dolor sit amot, consectetur adi piscing elit, set do eiusmodadipiscing elit, sed do eiusmodLorem</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
