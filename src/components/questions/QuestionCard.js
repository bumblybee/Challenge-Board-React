import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const date = question.createdAt.split("T")[0];

  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{question.username}</div>
        <div className="created-at">{date}</div>
        {question.isAnswered ? <i className="fas fa-bookmark"></i> : ""}
      </div>
      <div className="question-body">
        <p>{question.question}</p>
      </div>
      <div className="question-footer">
        <div className="comment-count">
          {question.commentCount}
          {question.commentCount > 1 || question.commentCount === 0
            ? " comments"
            : " comment"}
        </div>
        {/* TODO: link route to thread ID  */}
        <div className="view-thread">
          <Link to={`/challenge/question/${question.id}`}>View Thread</Link>
        </div>
      </div>
    </li>
  );
};

export default QuestionCard;
