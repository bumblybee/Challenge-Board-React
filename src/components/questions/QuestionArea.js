import React from "react";
import { useLocation } from "react-router-dom";

import QuestionList from "./QuestionList";
import QuestionThread from "./QuestionThread";

const QuestionArea = () => {
  const location = useLocation();

  const showQuestionThread = location.pathname.indexOf("/question") > -1;

  return (
    <div className="discussion-area">
      {!showQuestionThread ? <QuestionList /> : <QuestionThread />}
    </div>
  );
};

export default QuestionArea;
