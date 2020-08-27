import React, { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
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

    console.log(userData);
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
              <h2 style={{ marginBottom: "1rem" }}>Posts</h2>
              <ul>
                {questions
                  ? questions.map((question) => (
                      <Link
                        key={question.id}
                        style={{ color: "#fff" }}
                        to={`/challenge/question/${question.id}`}
                      >
                        <StyledAccountPost>
                          {/* Link post to thread */}
                          <h4>{question.title}</h4>
                          <p>{question.body}</p>
                        </StyledAccountPost>
                      </Link>
                    ))
                  : ""}
                {comments
                  ? comments.map((comment) => (
                      <Link
                        key={comment.id}
                        style={{ color: "#fff" }}
                        to={`/challenge/question/${comment.id}`}
                      >
                        <StyledAccountPost>
                          {/* Link post to thread */}

                          <p>{comment.body}</p>
                        </StyledAccountPost>
                      </Link>
                    ))
                  : ""}
              </ul>
            </StyledAccountPostsDiv>
            <div style={{ marginTop: "2rem" }}>
              <h4>Edit your username</h4>
              <h4>Edit your email</h4>
            </div>
          </Fragment>
        )}
      </StyledAccountDiv>
    </div>
  );
};

export default Account;
