import React, { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { getUserPosts } from "../api/userApi";
import { UserContext } from "../context/UserContext";

import {
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
} from "../styles/styledComponents";

const Account = () => {
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    user && getPosts();
  }, [user]);

  const getPosts = async () => {
    const userData = await getUserPosts(user.id);
    setQuestions(userData.data.questions);
    setComments(userData.data.comments);

    // console.log(userData);
  };

  return (
    <div>
      <StyledAccountDiv>
        {user && (
          <Fragment>
            <h1 style={{ textAlign: "center", padding: "4rem" }}>
              Hello, {user.username}. Nice to see you.
            </h1>

            <StyledAccountPostsDiv>
              <ul style={{ background: "#202225", padding: "0.5rem" }}>
                <h3>Questions</h3>
                {questions
                  ? questions.map((question) => (
                      <Link
                        key={question.id}
                        style={{ color: "#fff" }}
                        to={`/challenge/question/${question.id}`}
                      >
                        <StyledAccountPost>
                          <h3 style={{ marginBottom: "1rem" }}>
                            {question.title}
                          </h3>
                          <p>{question.body}</p>
                        </StyledAccountPost>
                      </Link>
                    ))
                  : ""}
                <h3 style={{ marginTop: "1rem" }}>Comments</h3>
                {comments
                  ? comments.map((comment) => (
                      <HashLink
                        key={comment.id}
                        style={{ color: "#fff" }}
                        to={`/challenge/question/${comment.questionId}#${comment.id}`}
                      >
                        <StyledAccountPost>
                          <p>{comment.body}</p>
                        </StyledAccountPost>
                      </HashLink>
                    ))
                  : ""}
              </ul>
            </StyledAccountPostsDiv>
            <div style={{ marginTop: "2rem" }}>
              <form>
                <h4>Edit username</h4>
                <h4>Edit email</h4>
              </form>
            </div>
          </Fragment>
        )}
      </StyledAccountDiv>
    </div>
  );
};

export default Account;
