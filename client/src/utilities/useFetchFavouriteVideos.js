// useFetchRecentVideos.js
import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetchFavouriteVideos = (user, token) => {
    const [favouriteVideos, setFavouriteVideos] = useState([]);

    useEffect(() => {
        const getFavouriteVideos = async () => {
            try {
                if (user?.learner_id) {
                    const res = await axios.get(
                        `http://localhost:8000/video/getFavouriteVideo/${user.learner_id}`,
                        {
                            headers: {Authorization: `Bearer ${token}`},
                        }
                    );
                    setFavouriteVideos(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getFavouriteVideos().then((r) => console.log(r));

        return () => {
            // Clean up if needed
        };
    }, [user, token]);

    return favouriteVideos;
};

export default useFetchFavouriteVideos;
