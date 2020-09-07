import React, { useContext } from "react";
import ChallengeArea from "../components/challenge-submission/ChallengeArea";
import SubmissionArea from "../components/challenge-submission/SubmissionArea";
import QuestionArea from "../components/questions/QuestionArea";
import { UserContext } from "../context/UserContext";

const Challenge = () => {
  const { user } = useContext(UserContext);
  //TODO: style components for submission area so can pass teacher propr and space appropriately
  return (
    <div role="main" className="container">
      {user && user.role === "Teacher" ? (
        <div className="challenge-submission-area">
          <SubmissionArea />
          <ChallengeArea />
        </div>
      ) : (
        <div className="challenge-submission-area">
          <ChallengeArea />
          <SubmissionArea />
        </div>
      )}

      <QuestionArea />
    </div>
  );
};

export default Challenge;
