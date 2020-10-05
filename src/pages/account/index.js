import React, { useContext, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

import moment from "moment";

import { UserContext } from "../../context/user/UserContext";

import * as sc from "./StyledAccount";

const Account = () => {
  const { user, getCurrentUser } = useContext(UserContext);
  const history = useHistory();
  !user && history.push("/");
  useEffect(() => {
    getCurrentUser();
    //eslint-disable-next-line
  }, []);

  const powerOff = (e) => {
    if (e.target.id === "powerBtn") {
      const postList = document.querySelectorAll(".post-list");
      const styledBtn = document.querySelector("#styled-btn");

      postList.forEach((list) => {
        if (list.style.display === "block") {
          list.style.display = "none";
          styledBtn.style.boxShadow = "inset 0 -1px 3px rgba(0, 0, 0, 0.2)";

          styledBtn.style.background = "#809bff";
          e.target.style.color = "#fffa";
        } else {
          list.style.display = "block";
          styledBtn.style.boxShadow =
            "0 -1px 12px #809bff8e, 0 1px 6px rgba(0, 0, 0, 0.2)";
          styledBtn.style.background = "#95acffee";
          e.target.style.color = "#fff";
        }
      });
    }
  };

  return (
    <div>
      <sc.StyledAccountDiv>
        {user && (
          <Fragment>
            <sc.StyledDashboardHeader>
              {user.username}'s Dashboard
              <sc.StyledButton id="styled-btn">
                <i
                  onClick={powerOff}
                  id="powerBtn"
                  className="fas fa-power-off"
                ></i>
              </sc.StyledButton>
            </sc.StyledDashboardHeader>
            <sc.StyledAccountPostsDiv className="account-div">
              <sc.StyledPostList className="post-list">
                <sc.StyledCategoryH3>Questions</sc.StyledCategoryH3>
                {user.questions && user.questions.length ? (
                  user.questions.map((question) => (
                    <sc.StyledLink
                      key={question.id}
                      to={`/challenge/question/${question.id}`}
                    >
                      <sc.StyledAccountPost>
                        <sc.StyledDate>
                          {moment(question.createdAt).format("DD/MM/YYYY")}
                        </sc.StyledDate>
                        <sc.StyledQuestionTitle>
                          {question.title}
                        </sc.StyledQuestionTitle>
                        <p>{question.body}</p>
                      </sc.StyledAccountPost>
                    </sc.StyledLink>
                  ))
                ) : (
                  <sc.StyledAccountPost noLength={true}>
                    <p>
                      <em>Looks like nothing's stumped you yet!</em>
                    </p>
                  </sc.StyledAccountPost>
                )}
              </sc.StyledPostList>
              <sc.StyledPostList className="post-list">
                <sc.StyledCategoryH3>Comments</sc.StyledCategoryH3>
                {user.comments && user.comments.length ? (
                  user.comments.map((comment) => (
                    //TODO: styled component for links
                    <sc.StyledHashLink
                      key={comment.id}
                      to={`/challenge/question/${comment.questionId}#${comment.id}`}
                    >
                      <sc.StyledAccountPost>
                        <sc.StyledDate>
                          {moment(comment.createdAt).format("DD/MM/YYYY")}
                          {""} {moment(comment.createdAt).format("LT")}
                        </sc.StyledDate>
                        <p>{comment.body}</p>
                      </sc.StyledAccountPost>
                    </sc.StyledHashLink>
                  ))
                ) : (
                  <sc.StyledAccountPost noLength={true}>
                    <p>
                      <em>Do some mingling!</em>
                    </p>
                  </sc.StyledAccountPost>
                )}
              </sc.StyledPostList>

              <sc.StyledPostList className="post-list">
                <sc.StyledCategoryH3>Projects</sc.StyledCategoryH3>
                {user.projects && user.projects.length ? (
                  user.projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.githubLink}
                      style={whiteText}
                    >
                      <sc.StyledAccountPost>
                        <sc.StyledDate>
                          {moment(project.createdAt).format("DD/MM/YYYY")}
                        </sc.StyledDate>
                        <p>{project.githubLink}</p>
                        <p>{project.additionLink}</p>
                        <p>{project.comment}</p>
                      </sc.StyledAccountPost>
                    </a>
                  ))
                ) : (
                  <sc.StyledAccountPost noLength={true}>
                    <p>
                      <em>Get to work on those projects!</em>
                    </p>
                  </sc.StyledAccountPost>
                )}
              </sc.StyledPostList>
            </sc.StyledAccountPostsDiv>
          </Fragment>
        )}
      </sc.StyledAccountDiv>
    </div>
  );
};

const whiteText = {
  color: "#fff",
};

export default Account;
