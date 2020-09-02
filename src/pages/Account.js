import React, { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { getUserPosts } from "../api/userApi";
import { UserContext } from "../context/UserContext";

import {
  StyledHelloH1,
  StyledQuestionTitle,
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledPostList,
} from "./StyledPages";

const Account = () => {
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const userData = await getUserPosts(user.id);
      setQuestions(userData.data.questions);
      setComments(userData.data.comments);
    };

    user && getPosts();
  }, [user]);

  return (
    <div>
      <StyledAccountDiv>
        {user && (
          <Fragment>
            <StyledHelloH1>
              Hello, {user.username}. Nice to see you.
            </StyledHelloH1>

            <StyledAccountPostsDiv>
              <StyledPostList>
                {questions.length === 0 ? (
                  <h3>Looks like you haven't created any posts yet.</h3>
                ) : (
                  <h3>Questions</h3>
                )}
                {questions
                  ? questions.map((question) => (
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
                {comments.length > 0 && <h3>Comments</h3>}
                {comments
                  ? comments.map((comment) => (
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
