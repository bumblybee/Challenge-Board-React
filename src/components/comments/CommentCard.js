import React, { useState, useContext } from "react";
import DOMPurify from "dompurify";
import moment from "moment";
import Truncate from "react-truncate";

import { deleteComment } from "../../api/commentsApi";

import { UserContext } from "../../context/UserContext";
import { ErrorContext } from "../../context/ErrorContext";

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

const CommentCard = ({ comment, answer, promoteAnswer, demoteAnswer }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const sanitize = DOMPurify.sanitize;

  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);

  const date = moment(comment.createdAt).format("L");
  const time = moment(comment.createdAt).format("LT");

  const deleteUserComment = async (comment) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const deletedComment = await deleteComment(comment.id);

      if (deletedComment.error) {
        setError(deletedComment.error);
        setTimeout(() => {
          toggleMenu();
          setError(undefined);
        }, 2000);
      } else if (deletedComment.data.deletedComment) {
        toggleMenu();
      }
    }
  };

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderMenuIcon = () => {
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
          {user && renderMenuIcon()}
        </StyledIconsDiv>
        {isOpen && user.role === "Teacher" ? (
          <TeacherMenu
            comment={comment}
            promoteAnswer={() => {
              toggleMenu();
              promoteAnswer(comment);
            }}
            demoteAnswer={() => {
              demoteAnswer(comment);
              toggleMenu();
            }}
            deleteUserComment={deleteUserComment}
          ></TeacherMenu>
        ) : isOpen && user.role === "Student" ? (
          <StudentMenu comment={comment} toggleMenu={toggleMenu} />
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
