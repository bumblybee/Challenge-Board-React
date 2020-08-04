import React from "react";
import ChallengeArea from "./ChallengeArea";
import SubmissionArea from "./SubmissionArea";

const ChallengeSubmissionArea = () => {
  return (
    <div className="challenge-submission-area">
      <ChallengeArea />
      <SubmissionArea />
    </div>
  );
};

export default ChallengeSubmissionArea;
