import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import './Quiz.css'

const FillInTheBlankQuiz = ({ transcript, video_id, track_id }) => {
  // Split the transcript string into an array of words
  const [user, setUser] = useState(useUser());
  const [buttonClass, setButtonClass] = useState("buttonSubmit");
  const wordsArray = transcript.split(/\s+/);
  console.log(wordsArray);
  const displayArray = [
    1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  ];
  // Initialize answers state with empty strings for each word
  const [answers, setAnswers] = useState(Array(wordsArray.length).fill(""));

  useEffect(() => {
    setAnswers(Array(wordsArray.length).fill(""));
  }, [transcript]);

  useEffect(() => {
    console.log("Current button class:", buttonClass);
  }, [buttonClass]);

  var correctAnswers = "";
  for (var i = 0; i < wordsArray.length; i++) {
    if (displayArray[i] == 0) correctAnswers += wordsArray[i];
  }

  const handleInputChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value.trim();
    setAnswers(newAnswers);
  };

  const renderTranscriptWithBlanks = () => {
    return wordsArray.map((word, index) => (
      <span key={index}>
        {displayArray[index] === 0 ? (
          <input
            type="text"
            value={answers[index]}
            onChange={(event) => handleInputChange(index, event)}
          />
        ) : (
          <span>{word}</span>
        )}
        {index < wordsArray.length - 1 && " "} {/* Add space between words */}
      </span>
    ));
  };

  const handleSubmit = () => {
    // Implement logic to check answers, submit, or provide feedback
    let text = answers.join("").toLowerCase();
    console.log("Submitted Answers:", text);
    console.log("Corrected Answer:", correctAnswers);
    if (correctAnswers === text) {
      alert("Correct answer");
      setButtonClass("buttonSubmit success");
      axios
        .put("http://localhost:8000/history/update-completed/", {
          learner_id: user.learner_id,
          video_id: video_id,
          track_id: track_id,
          completed: 1,
        })
        .then((response) => { })
        .catch((error) => {
          console.error("Error update result:", error);
        });
    } else {
      alert("Wrong answer");
      setButtonClass("buttonSubmit error");
    }
  };

  var animateButton = function (e) {

    e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 6000);
  };

  var classname = document.getElementsByClassName("button");

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
  }

  return (
    <div>
      <p className="question">{renderTranscriptWithBlanks()}</p>
      <button className={buttonClass} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FillInTheBlankQuiz;
