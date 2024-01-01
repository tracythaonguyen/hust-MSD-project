// UserContext.js
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:8000/learner/get-learner-by-token/${token}`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
