import React, { useContext, Fragment } from "react";
import loader from "../../assets/loading.gif";

import ChallengeArea from "../../components/challenge-submission/ChallengeArea";
import SubmissionArea from "../../components/challenge-submission/SubmissionArea";
import QuestionArea from "../../components/questions/QuestionArea";

import { UserContext } from "../../context/user/UserContext";

import * as sc from "./StyledChallenge";

const Challenge = () => {
  const { user, userLoading } = useContext(UserContext);

  return (
    <Fragment>
      {userLoading ? (
        <sc.StyledChallengeLoader
          src={loader}
          alt="loading"
          isUserState={true}
        />
      ) : (
        <sc.StyledContainer>
          {user && user.role === "Teacher" ? (
            <sc.StyledChallengeSubmissionArea>
              <SubmissionArea />
              <ChallengeArea />
            </sc.StyledChallengeSubmissionArea>
          ) : (
            <sc.StyledChallengeSubmissionArea>
              <ChallengeArea />
              <SubmissionArea />
            </sc.StyledChallengeSubmissionArea>
          )}
          <QuestionArea />
        </sc.StyledContainer>
      )}
    </Fragment>
  );
};

export default Challenge;
