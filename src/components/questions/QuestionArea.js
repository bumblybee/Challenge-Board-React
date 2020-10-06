import React from "react";
import { useLocation } from "react-router-dom";

import QuestionsList from "./QuestionsList";
import QuestionThread from "../thread/QuestionThread";

import { StyledQuestionArea } from "./StyledQuestions";

const QuestionArea = () => {
  const location = useLocation();

  const showQuestionThread = location.pathname.indexOf("/question") > -1;

  return (
    <StyledQuestionArea>
      {!showQuestionThread ? <QuestionsList /> : <QuestionThread />}
    </StyledQuestionArea>
  );
};

export default QuestionArea;
