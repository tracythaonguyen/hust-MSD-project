import React, { useState } from 'react';
import './popup.scss';
import axios from 'axios';
function Popup({ video, onClose }) {
    const [trackData, setTrackData] = useState({
        // Initialize your form fields here
        // For example:
        startTime: '',
        endTime: '',
        transcript: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrackData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission, for example, make an API call
        console.log('Submitting track data:', trackData, video);
        const newTrack = {
            ...trackData,
            videoId: video._id,
        };
        // axios.post('http://localhost:8000/track/create', newTrack).then((res) => {
        //     console.log(res);
        // }
        // ).catch((err) => {
        //     console.log(err);
        // }
        // );
        

        // Close the popup after submission
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2 className='popup__title'>Add Track</h2>
                <form className='popup__body' onSubmit={handleSubmit}>
                    {/* Your form fields */}
                    <label>
                        Start Time:
                        <input className='popup__input'
                            type="text"
                            name="startTime"
                            value={trackData.startTime}
                            onChange={handleInputChange}
                            placeholder='1'
                        />
                    </label>
                    <label>
                        End Time:
                        <input className='popup__input'
                            type="text"
                            name="endTime"
                            value={trackData.endTime}
                            onChange={handleInputChange}
                            placeholder='3'
                        />
                    </label>
                    <label>
                        Transcript:
                        <input  className='popup__input'
                            type="text"
                            name="transcript"
                            value={trackData.transcript}
                            onChange={handleInputChange}
                            placeholder='Hello world'
                        />
                    </label>

                    <button className='popup__btn' type="submit">Submit</button>
                </form>
                <button onClick={onClose} className='popup__close'>x</button>
            </div>
            <div className="overlay"></div>
        </div>
    );
}

export default Popup;
