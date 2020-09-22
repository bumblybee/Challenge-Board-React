import React, { useState, useContext } from "react";

import CommentCard from "./CommentCard";
import { ErrorContext } from "../../../context/error/ErrorContext";
import { UserContext } from "../../../context/user/UserContext";
import { ThreadContext } from "../../../context/thread/ThreadContext";
import TextareaAutosize from "react-autosize-textarea";

import {
  StyledCommentsThread,
  StyledSubmitButton,
  StyledCommentsForm,
} from "./StyledComments";

const CommentsList = ({ questionId }) => {
  const { user } = useContext(UserContext);
  const { submitComment, comments } = useContext(ThreadContext);
  // const { setError } = useContext(ErrorContext);
  const [newComment, setNewComment] = useState({
    body: "",
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    submitComment(questionId, newComment);
    setNewComment({
      ...newComment,
      body: "",
    });
  };

  const handleSubmitByKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCommentSubmit(e);
    }
  };

  return (
    <div className="comments-container">
      <StyledCommentsThread className="comments-thread">
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </StyledCommentsThread>
      <StyledCommentsForm
        onSubmit={handleCommentSubmit}
        onKeyPress={handleSubmitByKeyPress}
      >
        <TextareaAutosize
          onChange={(e) =>
            setNewComment({
              ...newComment,
              body: e.target.value,
            })
          }
          value={newComment.body}
          style={{
            background: "#18191B",
            border: "none",
            outline: "none",
            color: "#fff",
            width: "80%",
            fontSize: "1rem",
            fontFamily: "Arial",
            resize: "none",
          }}
          className="question-thread-input"
          placeholder={user ? "Comment" : "Log in to comment"}
          rows={1}
          required
          disabled={!user ? true : false}
        />

        <StyledSubmitButton className="submit-comment" type="submit">
          <i className="fas fa-paper-plane"></i>
        </StyledSubmitButton>
      </StyledCommentsForm>
    </div>
  );
};

export default CommentsList;
