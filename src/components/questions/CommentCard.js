import React from "react";
import moment from "moment";

const QuestionCard = ({ comment }) => {
  //TODO: MomentJS
  const date = moment(comment.createdAt).format("L");

  const time = moment(comment.createdAt).format("LT");

  return (
    <li className="comment-card" style={{ padding: "1rem", color: "#dcddde" }}>
      <div className="question-header">
        <div className="name">{comment.user.username}</div>
        <div className="time" style={{ marginRight: "1rem", color: "#7d8088" }}>
          {time}
        </div>
        <div className="day" style={{ color: "#7d8088" }}>
          {date}
        </div>

        {comment.isAnswer ? <i className="fas fa-bookmark"></i> : ""}
      </div>
      <div className="question-body">
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default QuestionCard;
