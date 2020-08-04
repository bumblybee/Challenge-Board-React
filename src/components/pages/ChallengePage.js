import React from "react";
import ChallengeSubmissionArea from "../challenge-submission/ChallengeSubmissionArea";
import DiscussionArea from "../discussion/DiscussionArea";

const ChallengePage = ({ questions, setQuestions }) => {
  return (
    <div role="main" className="container">
      <ChallengeSubmissionArea />
      <DiscussionArea questions={questions} setQuestions={setQuestions} />
    </div>
  );
};

export default ChallengePage;
