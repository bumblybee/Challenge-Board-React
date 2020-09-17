import React, { useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { getQuestions } from "../../api/questionsApi";

const QuestionState = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const questionsArray = await getQuestions();
    setQuestions(questionsArray);
  };

  return (
    <QuestionContext.Provider value={{ questions, fetchQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
