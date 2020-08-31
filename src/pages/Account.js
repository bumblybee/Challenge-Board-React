import React, { useContext, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { getUserPosts } from "../api/userApi";
import { UserContext } from "../context/UserContext";

import {
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
  StyledPostList,
} from "./StyledPages";

const Account = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    user && getPosts();
  }, [user]);

  const getPosts = async () => {
    const userData = await getUserPosts(user.id);
    setPosts(userData.data.questions);
    setComments(userData.data.comments);
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
              <StyledPostList>
                <h3>Questions</h3>
                {posts
                  ? posts.map((post) => (
                      <Link
                        key={post.id}
                        style={{ color: "#fff" }}
                        to={`/challenge/question/${post.id}`}
                      >
                        <StyledAccountPost>
                          <h4 style={{ marginBottom: "1.5rem" }}>
                            {post.title}
                          </h4>
                          <p>{post.body}</p>
                        </StyledAccountPost>
                      </Link>
                    ))
                  : ""}
              </StyledPostList>
              <StyledPostList>
                <h3>Comments</h3>
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
              </StyledPostList>
            </StyledAccountPostsDiv>
          </Fragment>
        )}
      </StyledAccountDiv>
    </div>
  );
};

export default Account;
