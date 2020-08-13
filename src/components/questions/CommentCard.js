import React from "react";

const QuestionCard = ({ comment }) => {
  const date = comment.createdAt.split("T");
  const day = date[0];
  let time = date[1].split(".")[0].slice(0, date.length - 5);

  return (
    <li className="comment-card" style={{ padding: "1rem" }}>
      <div className="question-header">
        <div className="name">{comment.user.username}</div>
        <div className="day" style={{ marginRight: "1rem" }}>
          {day}
        </div>
        <div className="time">{time}</div>
        {comment.isAnswer ? <i className="fas fa-bookmark"></i> : ""}
      </div>
      <div className="question-body">
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default QuestionCard;
