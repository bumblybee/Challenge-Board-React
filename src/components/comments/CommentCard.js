import React, { useState, useContext } from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import Truncate from "react-truncate";

import { UserContext } from "../../context/UserContext";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import {
  StyledCommentCard,
  StyledIconsDiv,
  StyledMenuIcon,
  StyledTimeDiv,
  StyledDateDiv,
  StyledSpan,
  StyledCommentText,
} from "./StyledComments";

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
    <StyledCommentCard id={comment.id} className="comment-card" answer={answer}>
      <div className="comment-header">
        <div className="name">{comment.user.username}</div>
        <StyledTimeDiv>{time}</StyledTimeDiv>
        <StyledDateDiv>{date}</StyledDateDiv>
        <StyledIconsDiv className="icons" isOpen={isOpen} answer={answer}>
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
            trimWhitespace
            style={{ color: "#dcddde", fontWeight: "300" }}
          >
            {sanitize(comment.body)}
          </Truncate>
        ) : (
          <StyledCommentText>
            {sanitize(comment.body)}{" "}
            <StyledSpan onClick={handleTruncate}>less</StyledSpan>
          </StyledCommentText>
        )}
      </div>
    </StyledCommentCard>
  );
};

export default CommentCard;
