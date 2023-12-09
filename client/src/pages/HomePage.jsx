import React from 'react';
import { Link } from 'react-router-dom';
import Landing from './landing/Landing';
import BackgroundImage from '../assets/images/bg.png'
import Header from "../components/Header";
import Footer from '../components/Footer';
import './HomePage.css'



export default function HomePage() {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
    }
    const isLogin = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const imgUrl = "https://s3-alpha-sig.figma.com/img/5abc/f770/24978c219bf2223fc9e32ec5fae8375f?Expires=1701648000&Signature=UuyfA8bHoyQEbJY6FN33Nt1zg9mbajrdHGQrlQht6F-DqeFLZk~Zt7gquOAI2Ccpi11PsVMdSJp047Lm5rhwegq4JEyFqBc2c0-gzWoCyA7gOcJ1NESHimvx3Hm8m0500Ln9dw32Y9TIRNd41FOCEfHLoIUF2RQs9jZ9Y7qDH4Wcx811G66DO45VeeMi9O~eJHNLg~CXJuRRiORDV9~FJU~MEmTDS8xJ2GBGu0SAXAFNC5Pnhd9aQuv2-e7yoFKamXwQkm3AmYKcybfIvCYXKP5Oej2D14k-2pDBuTuwCWKqknS0zEVmDV8l6zdx6DFYQRYGrvCgPFDatCmfzDQzJw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    console.log("token", isLogin);
    console.log("username", username);
    return (
        <div className="text-center" style={HeaderStyle}>
            {isLogin == null ? (
                <Landing /> // Display LandingPage if logged in
            ) : (
                <React.Fragment>
                    <Header />
                    <div className='content-container'>
                        <div className='top-content'>
                            <div className='search-group'>
                                <div className='search-box'>
                                    <input type="text" className='search-term' placeholder="Search your favourite course"></input>
                                    <button type="submit" className='search-button'>
                                        Search
                                    </button>
                                </div>

                                <div className='topic-group'>
                                    <div className='topic-item'>Subject</div>
                                    <div className='topic-item'>Subject</div>
                                    <div className='topic-item'>Subject</div>
                                    <div className='topic-item'>Subject</div>
                                    <div className='topic-item'>Subject</div>
                                </div>
                            </div>
                        </div>
                        <div className='advertisement'>
                            <div className='paragraph'>
                                <p className='p1'> By Group x in <span class='highlight'> ICT-K65</span> </p>
                                <h1>Learn English online and improve your skills through our high-quality courses.</h1>
                                <p className='p2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed</p>
                                <button className='start-btn'>Start learning now</button>
                            </div>
                            <img src={imgUrl} className='image' />
                        </div>

                        <div className='middle-content'>
                            <div className='topic-heading'>
                                <h2>Found Your Listening Topic</h2>
                                <p className='see-all'> See all</p>
                            </div>
                            <div className='group-blog'>
                                <div className='blog'>
                                    <img src={imgUrl} className='blog-image' />
                                    <h3>Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution</h3>
                                    <p className='p3'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                                    <div className='blog-footer'>
                                        <p className='read-more'>Read more</p>
                                        <div className='view-count'>
                                            200,000
                                        </div>
                                    </div>
                                </div>
                                <div className='blog'>
                                    <img src={imgUrl} className='blog-image' />
                                    <h3>Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution</h3>
                                    <p className='p3'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                                    <div className='blog-footer'>
                                        <p className='read-more'>Read more</p>
                                        <div className='view-count'>
                                            200,000
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='nav'>
                                <div className='nav-btn btn-fail'> &lt; </div>
                                <div className='nav-btn '> &gt; </div>
                            </div>
                        </div>
                        <div className='bottom-content'>
                            <div className='topic-heading'>
                                <h2>Recent Learning Videos</h2>
                                <p className='see-all'> See all</p>
                            </div>

                            <div className='video-group'>
                                <div className='video'>
                                    <img src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                                <div className='video'>
                                    <img src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                                <div className='video'>
                                    <img src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                                <div className='video'>
                                    <img src={imgUrl} className='video-image' />
                                    <div className='video-info'>
                                        <p className='topic-name'>Design</p>
                                        <p className='time'>3h</p>
                                    </div>
                                    <h4>AWS Certified solutions Architect</h4>
                                    <p className='p4'>Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
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