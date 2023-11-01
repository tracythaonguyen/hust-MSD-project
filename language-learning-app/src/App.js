import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

function App() {
  const [videos, setVideos] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showInput, setShowInput] = useState(false);
  const playerRefs = useRef({});
  const [playingStates, setPlayingStates] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const videosResponse = await axios.get('http://localhost:5000/videos');
        const tracksResponse = await axios.get(`http://localhost:5000/tracks/${videosResponse.data[0].video_id}`);
        setVideos(videosResponse.data);
        setTracks(tracksResponse.data);
        setPlayingStates(videosResponse.data.reduce((acc, video) => ({ ...acc, [video.video_id]: true }), {}));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, []);

  const handleProgress = (videoId) => (state) => {
    if (tracks.length === 0 || !playerRefs.current[videoId]) return;
    const currentTrack = tracks[currentTrackIndex];

    const currentTime = state.playedSeconds;
    console.log('Current Time:', currentTime);
    console.log('Start Time:', currentTrack.start_time);
    console.log('End Time:', currentTrack.end_time);

    if (currentTime >= currentTrack.start_time && currentTime <= currentTrack.end_time) {
      console.log('Inside the condition');
      setShowInput(true);
    } else if (currentTime > currentTrack.end_time) {
      console.log('Passed end time');
      setPlayingStates((prev) => ({ ...prev, [videoId]: false }));
      setShowInput(true);
    }
  };

  const handleSubmit = (videoId) => () => {
    const currentTrack = tracks[currentTrackIndex];
    if (userInput.toLowerCase() === currentTrack.transcript.toLowerCase()) {
      setFeedback('Correct');
      setUserInput('');

      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        console.log('End of tracks');
      }

      setPlayingStates((prev) => ({ ...prev, [videoId]: true }));
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  return (
    <div className="App">
      <h1>Videos</h1>
      {videos.map(video => (
        <div key={video.video_id}>
          <h3>{video.video_title} - {video.level}</h3>
          <ReactPlayer
            ref={(player) => playerRefs.current[video.video_id] = player}
            url={video.source_link}
            controls
            playing={playingStates[video.video_id]}
            onProgress={handleProgress(video.video_id)}
          />
          {showInput && tracks.length > 0 && (
            <div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button onClick={handleSubmit(video.video_id)}>Submit</button>
              <p>{feedback}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
