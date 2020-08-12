import React from "react";

const QuestionCard = ({ comment }) => {
  const date = comment.createdAt.split("T");
  const day = date[0];
  let time = date[1].split(".")[0].slice(0, date.length - 5);

  return (
    <li className="comment-card" style={{ marginBottom: "2rem" }}>
      <div className="question-header">
        <div className="name">{comment.username}</div>
        <div className="day" style={{ marginRight: "1rem" }}>
          {day}
        </div>
        <div className="time">{time}</div>
        {comment.chosenAnswer ? <i className="fas fa-bookmark"></i> : ""}
      </div>
      <div className="question-body">
        <p>{comment.comment}</p>
      </div>
    </li>
  );
};

export default QuestionCard;
