import React, { useContext, useState } from "react";
import moment from "moment";
import DOMPurify from "dompurify";

import { UserContext } from "../../context/user/UserContext";

import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";

import * as sc from "./StyledQuestions";

const QuestionCard = ({ question, reRenderList }) => {
  const date = moment(question.createdAt).format("DD/MM/YYYY");

  const sanitize = DOMPurify.sanitize;
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // If user is teacher or if user.id matches question.userId, render menu icon
  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === question.userId) {
      return (
        <sc.StyledMenuIcon
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
          menuOpen={menuOpen}
          inList={true}
        ></sc.StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  return (
    <sc.StyledQuestionCard>
      <sc.StyledQuestionHeader>
        <sc.StyledName>{question.user.username}</sc.StyledName>
        <sc.StyledDate>{date}</sc.StyledDate>
        <sc.StyledIconsDiv menuOpen={menuOpen}>
          {question.isAnswered ? (
            <sc.StyledIsAnsweredIcon className="fas fa-bookmark fa-lg"></sc.StyledIsAnsweredIcon>
          ) : (
            ""
          )}

          {user && renderMenuIcon()}
        </sc.StyledIconsDiv>

        {menuOpen && user !== null && user.role === "Teacher" ? (
          <TeacherMenu
            question={question}
            toggleMenu={toggleMenu}
          ></TeacherMenu>
        ) : menuOpen && user !== null && user.role === "Student" ? (
          <StudentMenu
            toggleMenu={toggleMenu}
            question={question}
            reRenderList={reRenderList}
          />
        ) : (
          ""
        )}
      </sc.StyledQuestionHeader>

      <sc.StyledQuestionBody>
        <p>{sanitize(question.title)}</p>
      </sc.StyledQuestionBody>
      <sc.StyledQuestionFooter>
        <sc.StyledCommentCount>
          {question.comments.length}
          {question.comments.length > 1 || question.comments.length === 0
            ? " Comments"
            : " Comment"}
        </sc.StyledCommentCount>

        <sc.StyledViewThreadDiv>
          <sc.StyledViewThreadLink to={`/challenge/question/${question.id}`}>
            View Thread
          </sc.StyledViewThreadLink>
        </sc.StyledViewThreadDiv>
      </sc.StyledQuestionFooter>
    </sc.StyledQuestionCard>
  );
};

export default QuestionCard;
