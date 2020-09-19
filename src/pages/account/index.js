import React, { useContext, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { UserContext } from "../../context/user/UserContext";

import {
  StyledHelloH1,
  StyledQuestionTitle,
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledPostList,
} from "./StyledAccount";

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <StyledAccountDiv>
        {user && (
          <Fragment>
            <StyledHelloH1>
              Hello {user.username}. Nice to see you.
            </StyledHelloH1>

            <StyledAccountPostsDiv>
              <StyledPostList>
                {user.questions &&
                user.questions.length === 0 &&
                user.comments.length === 0 ? (
                  <h3>Looks like you haven't created any posts yet.</h3>
                ) : (
                  <h3>Questions</h3>
                )}
                {user.questions
                  ? user.questions.map((question) => (
                      <Link
                        key={question.id}
                        style={whiteText}
                        to={`/challenge/question/${question.id}`}
                      >
                        <StyledAccountPost>
                          <StyledQuestionTitle>
                            {question.title}
                          </StyledQuestionTitle>
                          <p>{question.body}</p>
                        </StyledAccountPost>
                      </Link>
                    ))
                  : ""}
              </StyledPostList>
              <StyledPostList>
                {user.comments && user.comments.length > 0 && <h3>Comments</h3>}
                {user.comments
                  ? user.comments.map((comment) => (
                      //TODO: styled component for links
                      <HashLink
                        key={comment.id}
                        style={whiteText}
                        to={`/challenge/question/${comment.questionId}#${comment.id}`}
                      >
                        <StyledAccountPost>
                          <p>{comment.body}</p>
                        </StyledAccountPost>
                      </HashLink>
                    ))
                  : ""}
              </StyledPostList>

              <StyledPostList>
                {user.projects && user.projects.length > 0 && <h3>Projects</h3>}
                {user.projects
                  ? user.projects.map((project) => (
                      <a
                        key={project.id}
                        href={project.githubLink}
                        style={whiteText}
                      >
                        <StyledAccountPost>
                          <p>{project.githubLink}</p>
                          <p>{project.additionLink}</p>
                          <p>{project.comment}</p>
                        </StyledAccountPost>
                      </a>
                    ))
                  : ""}
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
