import React, { useState, useContext } from "react";
import DOMPurify from "dompurify";
import moment from "moment";

import { UserContext } from "../../../context/user/UserContext";

import TeacherMenu from "../../menus/TeacherMenu";
import StudentMenu from "../../menus/StudentMenu";
import * as sc from "./StyledComments";

const CommentCard = ({ comment, answer }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const sanitize = DOMPurify.sanitize;

  const { user } = useContext(UserContext);

  const date = moment(comment.createdAt).format("DD/MM/YYYY");
  const time = moment(comment.createdAt).format("LT");

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === comment.userId) {
      return (
        <sc.StyledMenuIcon
          isOpen={isOpen}
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
        ></sc.StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  return (
    <sc.StyledCommentCard
      id={comment.id}
      className="comment-card"
      answer={answer}
    >
      <div className="comment-header">
        <div className="name">{comment.user.username}</div>
        <sc.StyledTimeDiv>{time}</sc.StyledTimeDiv>
        <sc.StyledDateDiv>{date}</sc.StyledDateDiv>
        <sc.StyledIconsDiv className="icons" isOpen={isOpen} answer={answer}>
          {user && renderMenuIcon()}
        </sc.StyledIconsDiv>
        {isOpen && user !== null && user.role === "Teacher" ? (
          <TeacherMenu comment={comment} toggleMenu={toggleMenu}></TeacherMenu>
        ) : isOpen && user !== null && user.role === "Student" ? (
          <StudentMenu comment={comment} toggleMenu={toggleMenu} />
        ) : (
          ""
        )}
      </div>

      <div className="comment-body">
        {isTruncated ? (
          <sc.StyledTruncate
            line={3}
            element="div"
            truncateText="..."
            text={sanitize(comment.body)}
            textTruncateChild={
              <sc.StyledSpan onClick={handleTruncate}>more</sc.StyledSpan>
            }
          />
        ) : (
          <sc.StyledCommentText>
            {sanitize(comment.body)}
            <sc.StyledSpan onClick={handleTruncate}>less</sc.StyledSpan>
          </sc.StyledCommentText>
        )}
      </div>
    </sc.StyledCommentCard>
  );
};

export default CommentCard;
