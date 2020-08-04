import React from "react";
import ChallengeSubmissionArea from "../components/ChallengeSubmissionArea";
import DiscussionArea from "../components/DiscussionArea";

const ChallengePage = ({ questions, setQuestions }) => {
  return (
    <div role="main" className="container">
      <ChallengeSubmissionArea />
      <DiscussionArea questions={questions} setQuestions={setQuestions} />
    </div>
  );
};

export default ChallengePage;
