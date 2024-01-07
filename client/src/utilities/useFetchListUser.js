// useFetchRecentVideos.js
import {useEffect, useState} from 'react';
import axios from 'axios';

const useFetchListUser = (user, token) => {
    const [listUser, setListUser] = useState([]);

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

    return listUser;
};

export default useFetchListUser;
