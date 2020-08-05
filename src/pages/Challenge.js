import React from "react";
import ChallengeArea from "../challenge-submission/ChallengeArea";
import SubmissionArea from "../challenge-submission/SubmissionArea";
import QuestionArea from "../questions/QuestionArea";

const Challenge = ({ questions, setQuestions }) => {
  return (
    <div role="main" className="container">
      <ChallengeArea />
      <SubmissionArea />
      <QuestionArea questions={questions} setQuestions={setQuestions} />
    </div>
  );
};

export default Challenge;
