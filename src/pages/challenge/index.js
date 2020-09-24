import React, { useContext, useEffect } from "react";
import ChallengeArea from "../../components/challenge-submission/ChallengeArea";
import SubmissionArea from "../../components/challenge-submission/SubmissionArea";
import QuestionArea from "../../components/questions/QuestionArea";
import Test from "../../components/challenge-submission/Test";

import { UserContext } from "../../context/user/UserContext";

const Challenge = () => {
  const { user, getCurrentUser } = useContext(UserContext);

  useEffect(() => {
    getCurrentUser();

    //eslint-disable-next-line
  }, []);

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
          <Test />
        </div>
      )}
      <QuestionArea />
    </div>
  );
};

export default Challenge;
