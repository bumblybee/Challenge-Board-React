import React, { useState, useContext, useEffect, useRef } from "react";

import CommentCard from "./CommentCard";
import { UserContext } from "../../../context/user/UserContext";
import { ThreadContext } from "../../../context/thread/ThreadContext";

import * as sc from "./StyledComments";

const CommentsList = ({ questionId }) => {
  const { user } = useContext(UserContext);
  const { submitComment, comments } = useContext(ThreadContext);
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
  const ulRef = useRef();
  useEffect(() => {
    if (comments.length === 0) {
      ulRef.current.scrollIntoView();
    }
  });

  return (
    <sc.StyledCommentsContainer>
      <sc.StyledCommentsThread className="comments-thread">
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </sc.StyledCommentsThread>
      <sc.StyledCommentsForm onSubmit={handleCommentSubmit}>
        <sc.StyledTextarea
          ref={ulRef}
          onChange={(e) =>
            setNewComment({
              ...newComment,
              body: e.target.value,
            })
          }
          value={newComment.body}
          className="question-thread-input"
          placeholder={user ? "Comment" : "Log in to comment"}
          rows={1}
          required
          disabled={!user ? true : false}
        />

        <sc.StyledSubmitButton
          className="submit-comment"
          type="submit"
          isTyping={newComment.body ? true : false}
        >
          <sc.StyledSubmitIcon
            className="fas fa-paper-plane"
            isTyping={newComment.body ? true : false}
          ></sc.StyledSubmitIcon>
        </sc.StyledSubmitButton>
      </sc.StyledCommentsForm>
    </sc.StyledCommentsContainer>
  );
};

export default CommentsList;
