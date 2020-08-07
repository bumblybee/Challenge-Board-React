import React from "react";
import ChallengeArea from "../components/challenge-submission/ChallengeArea";
import SubmissionArea from "../components/challenge-submission/SubmissionArea";
import QuestionArea from "../components/questions/QuestionArea";

const Challenge = ({ loggedIn }) => {
  return (
    <div role="main" className="container">
      <div className="challenge-submission-area">
        <ChallengeArea />
        <SubmissionArea />
      </div>
      <QuestionArea loggedIn={loggedIn} />
    </div>
  );
};

export default Challenge;
