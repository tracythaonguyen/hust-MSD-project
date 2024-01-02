import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { withRouter } from "react-router-dom";
import { useParams } from 'react-router-dom';

const videoDescription = () => {
  // const {videoID} = props.match.params;
  const { videoID } = useParams();
  console.log(videoID);
  return (
    <div>
      <Header></Header>
      videoDescription
      <Footer></Footer>
    </div>
  );
};

export default videoDescription;
