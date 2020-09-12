import React from "react";
import { useLocation } from "react-router-dom";

import QuestionsList from "./QuestionsList";
import QuestionThread from "../thread/QuestionThread";

const QuestionArea = () => {
  const location = useLocation();

  const showQuestionThread = location.pathname.indexOf("/question") > -1;

  return (
    <div className="discussion-area">
      {!showQuestionThread ? <QuestionsList /> : <QuestionThread />}
    </div>
  );
};

export default QuestionArea;
