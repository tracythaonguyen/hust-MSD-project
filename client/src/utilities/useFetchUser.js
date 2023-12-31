// useFetchUser.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUser = (token) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/learner/get-learner-by-token/${token}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getUser().then((r) => console.log(r));

        return () => {
            // Clean up if needed
        };
    }, [token]);

    return user;
};

export default useFetchUser;
