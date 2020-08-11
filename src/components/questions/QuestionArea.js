import React from "react";
import { useLocation } from "react-router-dom";

import QuestionList from "./QuestionList";
import QuestionThread from "./QuestionThread";

const QuestionArea = () => {
  const location = useLocation();

  const showQuestionThread = location.pathname.indexOf("/question") > -1;

  return (
    <div className="discussion-area">
      {showQuestionThread ? (
        <div className="questions-container">
          <QuestionList />
        </div>
      ) : (
        <div className="questions-container">
          <QuestionThread />
        </div>
      )}
    </div>
  );
};

export default QuestionArea;
