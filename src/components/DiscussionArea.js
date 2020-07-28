import React from "react";
import QuestionCard from "./QuestionCard";

const DiscussionArea = ({ questions }) => {
  const handlePostQuestion = () => {
    console.log("clicked");
  };

  return (
    <div className="discussion-area">
      <div className="discussion-header-container">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          <h1>Ask a Question</h1>
        </div>
        <button
          className="modal-button"
          id="question-button"
          onClick={handlePostQuestion()}
        >
          Post a Question
        </button>
      </div>

      <div className="questions-container">
        <ul className="questions-thread">
          {questions.map((question, index) => (
            <QuestionCard question={question} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscussionArea;
