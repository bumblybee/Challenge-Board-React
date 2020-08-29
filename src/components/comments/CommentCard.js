import React, { useState, useContext } from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import Truncate from "react-truncate";

import { UserContext } from "../../context/UserContext";
import { StyledSpan } from "../../styles/styledComponents";
import TeacherMenu from "../../layout/TeacherMenu";
import StudentMenu from "../../layout/StudentMenu";
import { StyledIconsDiv, StyledMenuIcon } from "./StyledComments";

const CommentCard = ({ comment, answer, reRenderList }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const sanitize = DOMPurify.sanitize;

  const { user } = useContext(UserContext);

  const date = moment(comment.createdAt).format("L");
  const time = moment(comment.createdAt).format("LT");

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderMenu = () => {
    if (user.role === "Teacher" || user.id === comment.userId) {
      return (
        <StyledMenuIcon
          isOpen={isOpen}
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
        ></StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  return (
    <li
      id={comment.id}
      className="comment-card"
      style={{
        color: "#dcddde",
        padding: answer ? "1rem 1rem 1rem 2rem" : "1rem",
        position: "relative",
      }}
    >
      <div className="comment-header">
        <div className="name">{comment.user.username}</div>
        <div style={{ marginRight: "1rem", color: "#7d8088" }}>{time}</div>
        <div style={{ color: "#7d8088" }}>{date}</div>
        <StyledIconsDiv className="icons" isOpen={isOpen}>
          {user && renderMenu()}
        </StyledIconsDiv>
        {isOpen && user.role === "Teacher" ? (
          <TeacherMenu
            reRenderList={reRenderList}
            comment={comment}
            toggleMenu={toggleMenu}
          ></TeacherMenu>
        ) : isOpen && user.role === "Student" ? (
          <StudentMenu
            comment={comment}
            toggleMenu={toggleMenu}
            reRenderList={reRenderList}
          />
        ) : (
          ""
        )}
      </div>

      <div className="comment-body">
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

export default CommentCard;
