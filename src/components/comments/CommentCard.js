import React, { useState } from "react";
import moment from "moment";
import Truncate from "react-truncate";
import { StyledSpan } from "../../styles/styledComponents";

const QuestionCard = ({ comment }) => {
  //TODO: MomentJS

  const [isTruncated, setIsTruncated] = useState(true);
  const date = moment(comment.createdAt).format("L");
  const time = moment(comment.createdAt).format("LT");

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <li className="comment-card" style={{ padding: "1rem", color: "#dcddde" }}>
      <div className="question-header">
        <div className="name">{comment.user.username}</div>
        <div style={{ marginRight: "1rem", color: "#7d8088" }}>{time}</div>
        <div style={{ color: "#7d8088" }}>{date}</div>
      </div>

      <div className="question-body">
        {isTruncated ? (
          <Truncate
            lines={3}
            ellipsis={
              <span>
                ... <StyledSpan onClick={handleTruncate}>more</StyledSpan>
              </span>
            }
            trimWhitespace="true"
            style={{ color: "#dcddde", fontWeight: "300" }}
          >
            {comment.body}
          </Truncate>
        ) : (
          <div style={{ color: "#dcddde", fontWeight: "300" }}>
            {comment.body}{" "}
            <StyledSpan onClick={handleTruncate}>less</StyledSpan>
          </div>
        )}
      </div>
    </li>
  );
};

export default QuestionCard;
