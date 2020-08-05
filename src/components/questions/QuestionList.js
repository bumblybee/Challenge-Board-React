import React, { useState, useEffect } from "react";
import { getQuestions } from "../../api/questionsApi";
import QuestionCard from "./QuestionCard";

const QuestionsList = ({ newQuestion }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
    //Pass newQuestion into useEffect so that list is re-rendered when a new question is submitted
  }, [newQuestion]);

  return (
    <ul className="questions-thread">
      {questions.map((question, index) => (
        <QuestionCard question={question} key={index} />
      ))}
    </ul>
  );
};

export default QuestionsList;
