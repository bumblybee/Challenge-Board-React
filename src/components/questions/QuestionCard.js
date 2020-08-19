import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const QuestionCard = ({ question }) => {
  const date = moment(question.createdAt).format("L");
  const sanitize = DOMPurify.sanitize;
  const { user } = useContext(UserContext);

  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{question.user.username}</div>
        <div className="created-at">{date}</div>
        <div className="icons">
          {question.isAnswered ? (
            <i
              className="fas fa-bookmark fa-lg"
              style={{ marginRight: "2rem" }}
            ></i>
          ) : (
            ""
          )}
          {!user
            ? ""
            : user.role === "Teacher" && (
                <i className="fas fa-ellipsis-h fa-md"></i>
              )}
        </div>
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
