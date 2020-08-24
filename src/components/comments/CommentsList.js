import React, { useState, useContext } from "react";

import CommentCard from "./CommentCard";
import { createComment } from "../../api/questionsApi";
import { UserContext } from "../../context/UserContext";
import TextareaAutosize from "react-autosize-textarea";

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
      <ul
        className="comments-thread"
        style={{
          backgroundColor: "#202225",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {comments.map((comment, index) => (
          <CommentCard
            reRenderList={reRenderList}
            comment={comment}
            key={index}
          />
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#18191B",
          display: "flex",
          padding: "1rem",
        }}
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

        <button
          className="submit-comment"
          style={{
            marginLeft: "auto",
            border: "none",
            background: "#18191B",
          }}
          type="submit"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default CommentsList;
