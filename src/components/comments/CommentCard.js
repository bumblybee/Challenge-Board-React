import React, { useState, useContext } from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import Truncate from "react-truncate";
import { StyledSpan } from "../../styles/styledComponents";
import TeacherMenu from "../../layout/TeacherMenu";
import StudentMenu from "../../layout/StudentMenu";
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

  const toggleTeacherMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderMenu = () => {
    if (user.role === "Teacher" || user.id === comment.userId) {
      return (
        <i
          style={
            isOpen
              ? {
                  background: "#18191b",
                  padding: "1rem",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }
              : { padding: "0 1rem" }
          }
          onClick={toggleTeacherMenu}
          className="fas fa-ellipsis-h fa-lg"
        ></i>
      );
    } else {
      return null;
    }
  };

  return (
    <li
      className="comment-card"
      style={{
        color: "#dcddde",
        padding: "1rem 0 1rem 1rem",
        position: "relative",
      }}
    >
      <div className="question-header">
        <div className="name">{comment.user.username}</div>
        <div style={{ marginRight: "1rem", color: "#7d8088" }}>{time}</div>
        <div style={{ color: "#7d8088" }}>{date}</div>
        <div
          className="icons"
          style={{
            background: isOpen && "#18191b",
          }}
        >
          {user && !answer && renderMenu()}
        </div>
        {isOpen && user.role === "Teacher" ? (
          <TeacherMenu
            reRenderList={reRenderList}
            comment={comment}
            toggleTeacherMenu={toggleTeacherMenu}
          ></TeacherMenu>
        ) : isOpen && user.role === "Student" ? (
          <StudentMenu comment={comment} />
        ) : (
          ""
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
