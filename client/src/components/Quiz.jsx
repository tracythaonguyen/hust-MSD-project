import React, { useState, useEffect } from "react";

const FillInTheBlankQuiz = ({ transcript }) => {
  // Split the transcript string into an array of words
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
    }
    else alert("Wrong answer");
  };

  return (
    <div>
      <p>{renderTranscriptWithBlanks()}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FillInTheBlankQuiz;
