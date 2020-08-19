import React from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const date = moment(question.createdAt).format("L");
  const sanitize = DOMPurify.sanitize;
  console.log(question);
  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{question.user.username}</div>
        <div className="created-at">{date}</div>
        {question.isAnswered ? <i className="fas fa-bookmark"></i> : ""}
      </div>
      <div className="question-body">
        <p>{sanitize(question.title)}</p>
      </div>
      <div className="question-footer">
        <div className="comment-count">
          {question.comments.length}
          {question.comments.length > 1 || question.comments.length === 0
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
