import React from "react";
import ChallengeSection from "./ChallengeSection";
import SubmissionSection from "./SubmissionSection";

const ChallengeSubmissionArea = () => {
  return (
    <div className="challenge-submission-area">
      <ChallengeSection />
      <SubmissionSection />
    </div>
  );
};

export default ChallengeSubmissionArea;
