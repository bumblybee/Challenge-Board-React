import React, { useState, useContext } from "react";

import CommentCard from "./CommentCard";
import { createComment } from "../../api/commentsApi";
import { UserContext } from "../../context/UserContext";
import TextareaAutosize from "react-autosize-textarea";
import {
  StyledCommentsThread,
  StyledSubmitButton,
  StyledCommentsForm,
} from "./StyledComments";

const CommentsList = ({ comments, questionId, reRenderList }) => {
  const { user } = useContext(UserContext);

  const [newComment, setNewComment] = useState({
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      await createComment(questionId, newComment);
      reRenderList();

      //Clear input
      setNewComment({
        ...newComment,
        body: "",
      });
    }
  };

  return (
    <div className="comments-container">
      <StyledCommentsThread className="comments-thread">
        {comments.map((comment, index) => (
          <CommentCard
            reRenderList={reRenderList}
            comment={comment}
            key={index}
          />
        ))}
      </StyledCommentsThread>
      <StyledCommentsForm onSubmit={handleSubmit}>
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
