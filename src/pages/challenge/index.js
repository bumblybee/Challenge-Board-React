import React, { useContext, useEffect, Fragment } from "react";
import loading from "../../assets/loading.gif";

import ChallengeArea from "../../components/challenge-submission/ChallengeArea";
import SubmissionArea from "../../components/challenge-submission/SubmissionArea";
import QuestionArea from "../../components/questions/QuestionArea";

import { UserContext } from "../../context/user/UserContext";

import { StyledLoader } from "../../styles/GlobalStyledComponents";

const Challenge = () => {
  const { user, getCurrentUser, isLoading } = useContext(UserContext);

  useEffect(() => {
    // getCurrentUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <StyledLoader src={loading} alt="loading" isUserState={true} />
      ) : (
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
      )}
    </Fragment>
  );
};

export default Challenge;
