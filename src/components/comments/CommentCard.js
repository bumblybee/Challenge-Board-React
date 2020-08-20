import React, { useState, useContext } from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import Truncate from "react-truncate";
import { StyledSpan } from "../../styles/styledComponents";
import TeacherMenu from "../../layout/TeacherMenu";
import { UserContext } from "../../context/UserContext";

const QuestionCard = ({ comment, answer, reRenderList }) => {
  const sanitize = DOMPurify.sanitize;
  const { user } = useContext(UserContext);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const date = moment(comment.createdAt).format("L");
  const time = moment(comment.createdAt).format("LT");

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const openTeacherMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li
      className="comment-card"
      style={{ color: "#dcddde", padding: "1rem", position: "relative" }}
    >
      <div className="question-header">
        <div className="name">{comment.user.username}</div>
        <div style={{ marginRight: "1rem", color: "#7d8088" }}>{time}</div>
        <div style={{ color: "#7d8088" }}>{date}</div>
        <div className="icons">
          {!user
            ? ""
            : user.role === "Teacher" &&
              !answer && (
                <i
                  onClick={openTeacherMenu}
                  className="fas fa-ellipsis-h fa-lg"
                ></i>
              )}
        </div>
        {isOpen && (
          <TeacherMenu
            reRenderList={reRenderList}
            comment={comment}
          ></TeacherMenu>
        )}
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
            {sanitize(comment.body)}
          </Truncate>
        ) : (
          <div style={{ color: "#dcddde", fontWeight: "300" }}>
            {sanitize(comment.body)}{" "}
            <StyledSpan onClick={handleTruncate}>less</StyledSpan>
          </div>
        )}
      </div>
    </li>
  );
};

export default QuestionCard;
