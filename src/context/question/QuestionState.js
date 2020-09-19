import React, { useState } from "react";
import { QuestionContext } from "./QuestionContext";
import {
  getQuestions,
  createQuestion,
  editQuestion,
  deleteQuestion,
} from "../../api/questionsApi";

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

  const updateQuestion = async (question, data) => {
    const updatedQuestions = await editQuestion(question.id, data);

    if (updatedQuestions.error) {
      return updatedQuestions;
    } else {
      setQuestions(updatedQuestions.data.questions);
    }
  };

  const deleteUserQuestion = async (question) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = await deleteQuestion(question.id);

      if (updatedQuestions.error) {
        return updatedQuestions;
      } else {
        setQuestions(updatedQuestions.data.questions);
      }
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        fetchQuestions,
        submitNewQuestion,
        updateQuestion,
        deleteUserQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
