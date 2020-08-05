import React from "react";
import QuestionCard from "./QuestionCard";

const QuestionsList = ({ questions }) => {
  return (
    <ul className="questions-thread">
      {questions.map((question, index) => (
        <QuestionCard question={question} key={index} />
      ))}
    </ul>
  );
};

export default QuestionsList;
