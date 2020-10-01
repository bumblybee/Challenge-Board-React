import React, { useContext, useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import moment from "moment";

import { UserContext } from "../../context/user/UserContext";

import {
  StyledUserMessage,
  StyledCategoryH3,
  StyledQuestionTitle,
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledPostList,
  StyledDate,
} from "./StyledAccount";

const Account = () => {
  const { user, getCurrentUser } = useContext(UserContext);
  const history = useHistory();
  !user && history.push("/");
  useEffect(() => {
    getCurrentUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <StyledAccountDiv>
        {user && (
          <Fragment>
            <StyledUserMessage>{user.username}'s Dashboard</StyledUserMessage>
            <StyledAccountPostsDiv className="account-div">
              <StyledPostList>
                <StyledCategoryH3>Questions</StyledCategoryH3>
                {user.questions && user.questions.length ? (
                  user.questions.map((question) => (
                    <Link
                      key={question.id}
                      style={whiteText}
                      to={`/challenge/question/${question.id}`}
                    >
                      <StyledAccountPost>
                        <StyledDate>
                          {moment(question.createdAt).format("DD/MM/YYYY")}
                        </StyledDate>
                        <StyledQuestionTitle>
                          {question.title}
                        </StyledQuestionTitle>
                        <p>{question.body}</p>
                      </StyledAccountPost>
                    </Link>
                  ))
                ) : (
                  <StyledAccountPost noLength={true}>
                    <p>
                      <em>Looks like nothing's stumped you yet!</em>
                    </p>
                  </StyledAccountPost>
                )}
              </StyledPostList>
              <StyledPostList>
                <StyledCategoryH3>Comments</StyledCategoryH3>
                {user.comments && user.comments.length ? (
                  user.comments.map((comment) => (
                    //TODO: styled component for links
                    <HashLink
                      key={comment.id}
                      style={whiteText}
                      to={`/challenge/question/${comment.questionId}#${comment.id}`}
                    >
                      <StyledAccountPost>
                        <StyledDate>
                          {moment(comment.createdAt).format("DD/MM/YYYY")}
                        </StyledDate>
                        <p>{comment.body}</p>
                      </StyledAccountPost>
                      {/* <StyledHr /> */}
                    </HashLink>
                  ))
                ) : (
                  <StyledAccountPost noLength={true}>
                    <p>
                      <em>Do some mingling!</em>
                    </p>
                  </StyledAccountPost>
                )}
              </StyledPostList>

              <StyledPostList>
                <StyledCategoryH3>Projects</StyledCategoryH3>
                {user.projects && user.projects.length ? (
                  user.projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.githubLink}
                      style={whiteText}
                    >
                      <StyledAccountPost>
                        <StyledDate>
                          {moment(project.createdAt).format("DD/MM/YYYY")}
                        </StyledDate>
                        <p>{project.githubLink}</p>
                        <p>{project.additionLink}</p>
                        <p>{project.comment}</p>
                      </StyledAccountPost>
                    </a>
                  ))
                ) : (
                  <StyledAccountPost noLength={true}>
                    <p>
                      <em>Get to work on those projects!</em>
                    </p>
                  </StyledAccountPost>
                )}
              </StyledPostList>
            </StyledAccountPostsDiv>
          </Fragment>
        )}
      </StyledAccountDiv>
    </div>
  );
};

const whiteText = {
  color: "#fff",
};

export default Account;
