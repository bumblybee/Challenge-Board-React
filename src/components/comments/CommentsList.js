import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { createComment } from "../../api/questionsApi";
import TextareaAutosize from "react-autosize-textarea";

const CommentsList = ({ comments, questionId, renderListOnNewComment }) => {
  //TODO: setIsAnswer in teacher view
  const [isAnswer, setIsAnswer] = useState(false);
  const [newComment, setNewComment] = useState({
    body: "",
    isAnswer: isAnswer,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createComment(questionId, newComment);
    renderListOnNewComment(true);

    //Clear input
    setNewComment({
      ...newComment,
      body: "",
    });
  };

  return (
    <div className="comments-container">
      <ul
        className="comments-thread"
        style={{
          backgroundColor: "#202225",
          overflow: "auto",
        }}
      >
        {comments.map((comment, index) => (
          <CommentCard comment={comment} key={index} />
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
          placeholder="Comment"
          rows={1}
          required
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
