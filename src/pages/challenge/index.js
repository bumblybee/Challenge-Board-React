import React, { useContext, useEffect, Fragment } from "react";
import loading from "../../assets/loading.gif";

import ChallengeArea from "../../components/challenge-submission/ChallengeArea";
import SubmissionArea from "../../components/challenge-submission/SubmissionArea";
import QuestionArea from "../../components/questions/QuestionArea";

import { UserContext } from "../../context/user/UserContext";

import { StyledLoader } from "../../styles/GlobalStyledComponents";

import {
  StyledContainer,
  StyledChallengeSubmissionArea,
} from "./StyledChallenge";

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
        <StyledContainer>
          {user && user.role === "Teacher" ? (
            <StyledChallengeSubmissionArea>
              <SubmissionArea />
              <ChallengeArea />
            </StyledChallengeSubmissionArea>
          ) : (
            <StyledChallengeSubmissionArea>
              <ChallengeArea />
              <SubmissionArea />
            </StyledChallengeSubmissionArea>
          )}
          <QuestionArea />
        </StyledContainer>
      )}
    </Fragment>
  );
};

export default Challenge;
