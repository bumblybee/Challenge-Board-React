import React from "react";

const QuestionCard = ({ comment }) => {
  const date = comment.createdAt.split("T")[0];

  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{comment.username}</div>
        <div className="created-at">{date}</div>
        {comment.chosenAnswer ? <i className="fas fa-bookmark"></i> : ""}
      </div>
      <div className="question-body">
        <p>{comment.comment}</p>
      </div>
    </li>
  );
};

export default QuestionCard;
