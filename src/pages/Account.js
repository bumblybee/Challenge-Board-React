import React, { useContext, Fragment } from "react";
import { UserContext } from "../context/UserContext";
import {
  StyledAccountDiv,
  StyledAccountPostsDiv,
  StyledAccountPost,
} from "../styles/styledComponents";

const Account = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <StyledAccountDiv>
        {user && (
          <Fragment>
            <h1 style={{ textAlign: "center", padding: "4rem" }}>
              Hello, {user.username}. Nice to see you.
            </h1>

            <StyledAccountPostsDiv>
              <h2 style={{ marginBottom: "2rem" }}>Your Posts</h2>
              <ul>
                <StyledAccountPost>
                  {/* Link post to thread */}
                  Post One
                </StyledAccountPost>
                <StyledAccountPost>Post Two</StyledAccountPost>
                <StyledAccountPost>Post Three</StyledAccountPost>
                <StyledAccountPost>Post Four</StyledAccountPost>
              </ul>
            </StyledAccountPostsDiv>
            <div style={{ marginTop: "2rem" }}>
              <h5>Edit your username</h5>
            </div>
          </Fragment>
        )}
      </StyledAccountDiv>
    </div>
  );
};

export default Account;
