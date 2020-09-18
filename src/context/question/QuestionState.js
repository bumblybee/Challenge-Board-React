import React, { useState } from "react";
import { QuestionContext } from "./QuestionContext";
import { getQuestions } from "../../api/questionsApi";
import { createQuestion } from "../../api/questionsApi";

const QuestionState = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const questionsArray = await getQuestions();
    setQuestions(questionsArray);
  };

  const submitNewQuestion = async (data) => {
    const updatedQuestions = await createQuestion(data);

    if (updatedQuestions && updatedQuestions.error) {
      return updatedQuestions;
    } else {
      setQuestions(updatedQuestions.data.questions);
      // return updatedQuestions;
    }
  };

  return (
    <QuestionContext.Provider
      value={{ questions, fetchQuestions, submitNewQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
