import React from "react";
import ChallengeSubmissionArea from "../components/ChallengeSubmissionArea";
import DiscussionArea from "../components/DiscussionArea";

const ChallengePage = ({ questions }) => {
  return (
    <div role="main" className="container">
      <ChallengeSubmissionArea />
      <DiscussionArea questions={questions} />
    </div>
  );
};

export default ChallengePage;
