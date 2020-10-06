import React, { useState, useMemo, useCallback } from "react";
import { QuestionContext } from "./QuestionContext";
import {
  getQuestions,
  createQuestion,
  editQuestion,
  deleteQuestion,
} from "../../api/questionsApi";

const QuestionState = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setQuestionsLoading(true);
    const questionsArray = await getQuestions();

    if (questionsArray && questionsArray.error) {
      setQuestionsLoading(false);
      return;
    } else {
      setQuestions(questionsArray.data);
      setQuestionsLoading(false);
    }
  }, []);

  const submitNewQuestion = async (data) => {
    const updatedQuestions = await createQuestion(data);

    if (updatedQuestions && updatedQuestions.error) {
      return updatedQuestions;
    } else {
      setQuestions(updatedQuestions.data.questions);
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

  const value = useMemo(
    () => ({
      questions,
      questionsLoading,
      fetchQuestions,
      submitNewQuestion,
      updateQuestion,
      deleteUserQuestion,
    }),

    [questions, questionsLoading]
  );

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
