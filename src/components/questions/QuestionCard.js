import React, { useContext, useState } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";

import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import {
  StyledMenuIcon,
  StyledIconsDiv,
  StyledViewThreadDiv,
  StyledIsAnsweredIcon,
} from "./StyledQuestions";

const QuestionCard = ({ question, reRenderList }) => {
  const date = moment(question.createdAt).format("L");

  const sanitize = DOMPurify.sanitize;
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // If user is teacher or if user.id matches question.userId, render menu icon
  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === question.userId) {
      return (
        <StyledMenuIcon
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
          isOpen={isOpen}
          inList={true}
        ></StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{question.user.username}</div>
        <div className="created-at">{date}</div>
        <StyledIconsDiv className="icons" isOpen={isOpen}>
          {question.isAnswered ? (
            <StyledIsAnsweredIcon className="fas fa-bookmark fa-lg"></StyledIsAnsweredIcon>
          ) : (
            ""
          )}

          {user && renderMenuIcon()}
        </StyledIconsDiv>

        {isOpen && user.role === "Teacher" ? (
          <TeacherMenu
            question={question}
            deleteUserQuestion={() => {
              toggleMenu();
            }}
          ></TeacherMenu>
        ) : isOpen && user.role === "Student" ? (
          <StudentMenu
            toggleMenu={toggleMenu}
            question={question}
            reRenderList={reRenderList}
          />
        ) : (
          ""
        )}
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

        <StyledViewThreadDiv className="view-thread">
          <Link to={`/challenge/question/${question.id}`}>View Thread</Link>
        </StyledViewThreadDiv>
      </div>
    </li>
  );
};

export default QuestionCard;
