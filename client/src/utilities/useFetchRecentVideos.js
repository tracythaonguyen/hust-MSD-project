// useFetchRecentVideos.js
import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetchRecentVideos = (user, token) => {
    const [recentVideos, setRecentVideos] = useState([]);

    useEffect(() => {
        const getRecentVideos = async () => {
            try {
                if (user?.learner_id) {
                    const res = await axios.get(
                        `http://localhost:8000/video/getRecentLearningVideo/${user.learner_id}`,
                        {
                            headers: {Authorization: `Bearer ${token}`},
                        }
                    );
                    setRecentVideos(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getRecentVideos().then((r) => console.log(r));

        return () => {
            // Clean up if needed
        };
    }, [user, token]);

    return recentVideos;
};

export default useFetchRecentVideos;
