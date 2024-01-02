import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import './HomePage.css';
import imgUrl from '../assets/images/ads.png';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import useFetchUser from "../utilities/useFetchUser";
import useFetchRecentVideos from "../utilities/useFetchRecentVideos";

export default function HomePage() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const user = useFetchUser(token);
    const recentVideos = useFetchRecentVideos(user, token);
    //connect to API to get videos
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get("http://localhost:8000/video");
                setVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getVideos().then(r => console.log(r));
    }, []);


    //handle videos per page (Found your topic)
    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 2;

    const startIndex = currentPage * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const currentVideos = videos.slice(startIndex, endIndex);
    console.log("1", currentVideos);
    const handleNextPage = () => {
        if (currentPage < videos.length / videosPerPage - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    //#region NEW FUNCTIONS -> DEV: HOANG
    const [filterData, setFilterData] = useState("");
    //#region -> Searching Functionalities
    // search function with param is input text from search-term className
    const search = async (searchTerm) => {
        console.log("Search Term: ", searchTerm);
        setFilterData(searchTerm);
        if (searchByTag) {
            // TODO: Search by tag
            // find the tag with name is searchTerm
            const tag = tags.find(({tag_name}) => {
                return tag_name === searchTerm;
            });
            // check if tag is found
            if (tag) {
                console.log("Tag found: ", tag);
                // get the video list with tag_id by using axios.get("http://localhost:8000/video/getVideosByTag/:tag_id")
                try {
                    const res = await axios.get(`http://localhost:8000/video/getVideosByTag/${tag.tag_id}`);
                    console.log("Search Results: ", res.data);
                    // Navigate to TopicPage with searchResults
                    history.push({
                        pathname: '/videoList',
                        state: {initVideoListData: res.data},
                    });
                } catch (err) {
                    console.log(err);
                }
            } else {
                // show error message
                alert("Tag not found!");
            }
        } else {
            if (searchTerm !== "") {
                const newVideoList = videos.filter((video) => {
                    return Object.values(video)
                        .join(" ")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                });
                // debug
                console.log("Search Results: ", newVideoList);
                // Navigate to TopicPage with searchResults
                history.push({
                    pathname: '/videoList',
                    state: {initVideoListData: newVideoList},
                });
            } else {
                history.push({
                    pathname: '/videoList',
                    state: {initVideoListData: videos},
                });
            }
        }
    }
    //#endregion
    //#region -> Filter by Popular Functionalities
    // Sort by view count
    const sortByViewCount = () => {
        const newVideoList = videos.sort((a, b) => {
            return b.view - a.view;
        });
        // debug
        console.log("Sort By View Count: ", newVideoList);
        // Navigate to TopicPage with searchResults
        history.push({
            pathname: '/videoList',
            state: {initVideoListData: newVideoList},
        });
    }
    //#endregion
    //#region -> Filter by New Functionalities
    // Sort by upload_date
    const sortByUploadDate = () => {
        const newVideoList = videos.sort(({upload_date: upload_date1}, {upload_date}) => {
            return upload_date - upload_date1;
        });
        // debug
        console.log("Sort By Upload Date: ", newVideoList);
        // Navigate to TopicPage with searchResults
        history.push({
            pathname: '/videoList',
            state: {initVideoListData: newVideoList},
        });
    }
    //#endregion
    //#region -> Dropdown Categories Functionalities
    const [categories, setCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("http://localhost:8000/category");
                setCategories(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getCategories().then(r => console.log(r));
    }, []);

    // Show dropdown categories with name when click on Categories button
    const showDropdownCategories = () => {
        console.log("Show dropdown categories");
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    }

    // Filter by category id
    const filterByCategory = (categoryId) => {
        console.log("Filter by category id: ", categoryId);
        const newVideoList = videos.filter(({category_id}) => {
            return category_id === categoryId;
        });
        // debug
        console.log("Filter By Category: ", newVideoList);
        // Navigate to TopicPage with searchResults
        history.push({
            pathname: '/videoList',
            state: {initVideoListData: newVideoList},
        });
    }
    //#region -> Search by tag Functionalities
    // fetch all tags data
    const [tags, setTags] = useState([]);
    useEffect(() => {
        const getTags = async () => {
            try {
                const res = await axios.get("http://localhost:8000/tag");
                setTags(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getTags().then(r => console.log(r));
    }, []);

    // button to select search by tag or by name
    const [searchByTag, setSearchByTag] = useState(false);
    const searchByTagButton = () => {
        if (!searchByTag) {
            document.getElementById("search-by-tag").innerHTML = "Search by tag";
        } else {
            document.getElementById("search-by-tag").innerHTML = "Search by name";
        }
        console.log(`Search by tag: ${searchByTag}`);
        setSearchByTag(!searchByTag); // Toggle dropdown visibility
        // change the text of button

    }

    //#endregion

    return (
        <div className="text-center" style={HeaderStyle}>
            {/* {token == null ? ( */}
            {(
                <React.Fragment>
                    <Header/>
                    <div className='content-container'>
                        <div className='top-content'>
                            <div className='search-group'>
                                <div className='search-box'>
                                    <button id='search-by-tag' className='search-option-button'
                                        onClick={() => searchByTagButton()}>Search by name</button>
                                    <input type="text" className='search-term'
                                           placeholder="Input Keyword..."
                                           value={filterData}
                                           onChange={(e) => setFilterData(e.target.value)}></input>
                                    <button type="submit" className='search-button'
                                            onClick={() => search(filterData)}>
                                        Search
                                    </button>
                                </div>
                                <div className='topic-group'>
                                    <button className='topic-item'
                                            onClick={() => sortByViewCount()}>Popular
                                    </button>
                                    <button className='topic-item'
                                            onClick={() => sortByUploadDate()}>New
                                    </button>
                                    <div className="dropdown">
                                        <button className='topic-item'
                                                onClick={() => showDropdownCategories()}>Categories
                                        </button>
                                        {showDropdown && (
                                            <div className="dropdown-content">
                                                {categories.map(({category_id, category_name}) => (
                                                    <button key={category_id}
                                                            onClick={() => filterByCategory(category_id)}>
                                                        {category_name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {/*<button className='topic-item'>Search by</button>*/}
                                </div>
                            </div>
                        </div>
                        <div className='advertisement'>
                            <div className='paragraph'>
                                <p className='p1'> By Group x in <span className='highlight'> ICT-K65</span></p>
                                <h1>Learn English online and improve your skills through our high-quality courses.</h1>
                                <p className='p2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed</p>
                                <button className='start-btn'>Start learning now</button>
                            </div>
                            <img alt='img' src={imgUrl} className='image'/>
                        </div>

                        <div className='middle-content'>
                            <div className='topic-heading'>
                                <h2>Found Your Listening Topic</h2>
                                <p className='see-all'> See all</p>
                            </div>
                            <div className='group-blog'>
                                {currentVideos.map(({video_id, description, link_img, video_title, view}) => (
                                    <div className='blog' key={video_id}>
                                        <img alt='img' src={link_img} className='blog-image'/>
                                        <h3>{video_title}</h3>
                                        <p className='p3'>{description}</p>
                                        <div className='blog-footer'>
                                            <p className='read-more'>Read more</p>
                                            <div className='view-count'>
                                                {view}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='nav'>
                                <button className='nav-btn btn-fail' onClick={handlePrevPage}> &lt; </button>
                                <button className='nav-btn' onClick={handleNextPage}> &gt; </button>
                            </div>
                        </div>
                        <div className='bottom-content'>
                            <div className='topic-heading'>
                                <h2>Recent Learning Videos</h2>
                                <p className='see-all'> See all</p>
                            </div>

                            <div className='video-group'>
                                {recentVideos.slice(0, 4).map(({description, link_img, time, topic, video_title}) => (
                                    <div className='video'>
                                        <img alt='img' src={link_img} className='video-image'/>
                                        <div className='video-info'>
                                            <p className='topic-name'>{topic}</p>
                                            <p className='time'>{time}</p>
                                        </div>
                                        <h4>{video_title}</h4>
                                        <p className='p4'>{description}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <Footer/>
                </React.Fragment>
            )}
        </div>
    );
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    // background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}