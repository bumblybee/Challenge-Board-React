import React, { useContext, useState } from "react";
import moment from "moment";
import DOMPurify from "dompurify";

import { UserContext } from "../../context/user/UserContext";

import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import {
  StyledQuestionCard,
  StyledQuestionHeader,
  StyledQuestionBody,
  StyledName,
  StyledDate,
  StyledQuestionFooter,
  StyledMenuIcon,
  StyledIconsDiv,
  StyledCommentCount,
  StyledViewThreadDiv,
  StyledViewThreadLink,
  StyledIsAnsweredIcon,
} from "./StyledQuestions";

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
        <StyledMenuIcon
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
          menuOpen={menuOpen}
          inList={true}
        ></StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  return (
    <StyledQuestionCard>
      <StyledQuestionHeader>
        <StyledName>{question.user.username}</StyledName>
        <StyledDate>{date}</StyledDate>
        <StyledIconsDiv menuOpen={menuOpen}>
          {question.isAnswered ? (
            <StyledIsAnsweredIcon className="fas fa-bookmark fa-lg"></StyledIsAnsweredIcon>
          ) : (
            ""
          )}

          {user && renderMenuIcon()}
        </StyledIconsDiv>

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
      </StyledQuestionHeader>

      <StyledQuestionBody>
        <p>{sanitize(question.title)}</p>
      </StyledQuestionBody>
      <StyledQuestionFooter>
        <StyledCommentCount>
          {question.comments.length}
          {question.comments.length > 1 || question.comments.length === 0
            ? " Comments"
            : " Comment"}
        </StyledCommentCount>

        <StyledViewThreadDiv>
          <StyledViewThreadLink to={`/challenge/question/${question.id}`}>
            View Thread
          </StyledViewThreadLink>
        </StyledViewThreadDiv>
      </StyledQuestionFooter>
    </StyledQuestionCard>
  );
};

export default QuestionCard;
