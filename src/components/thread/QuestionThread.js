import React, { Fragment, useState, useEffect, useContext } from "react";
import moment from "moment";
import DOMPurify from "dompurify";

import { useHistory, useLocation } from "react-router-dom";

import { ThreadContext } from "../../context/thread/ThreadContext";
import { UserContext } from "../../context/user/UserContext";

import CommentsList from "./comments/CommentsList";
import ThreadAnswer from "./ThreadAnswer";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";

import { StyledPurpleButton } from "../../styles/GlobalStyledComponents";

import {
  StyledSpan,
  StyledMenuIcon,
  StyledThreadQuestion,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledDateDiv,
  StyledTruncate,
} from "../questions/StyledQuestions";

const QuestionThread = () => {
  const sanitize = DOMPurify.sanitize;
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { user } = useContext(UserContext);
  const { fetchThread, threadQuestion, comments } = useContext(ThreadContext);

  const date = moment(threadQuestion.createdAt).format("L");
  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    fetchThread(questionId);
    //eslint-disable-next-line
  }, []);

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === threadQuestion.userId) {
      return (
        <StyledMenuIcon
          isOpen={isOpen}
          inList={false}
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
        ></StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className="discussion-header-container thread">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          <h1>Ask a Question</h1>
        </div>

        <StyledPurpleButton onClick={() => history.push("/challenge")}>
          Back
        </StyledPurpleButton>
      </div>

      <div className="thread-container">
        <StyledThreadQuestion className="thread-question">
          <div className="question-header">
            <div className="name">
              {threadQuestion.user && threadQuestion.user.username}
            </div>
            <StyledDateDiv className="created-at">{date}</StyledDateDiv>

            <div className="icons">{user && renderMenuIcon()}</div>
            {isOpen && user !== null && user.role === "Teacher" ? (
              <TeacherMenu
                question={threadQuestion}
                threadQuestion={true}
                toggleMenu={toggleMenu}
              ></TeacherMenu>
            ) : isOpen && user !== null && user.role === "Student" ? (
              <StudentMenu
                question={threadQuestion}
                toggleMenu={toggleMenu}
              ></StudentMenu>
            ) : (
              ""
            )}
          </div>
          <div className="question-body">
            <StyledQuestionTitle>
              {sanitize(threadQuestion.title)}
            </StyledQuestionTitle>
            {isTruncated ? (
              <StyledTruncate
                line={3}
                element="div"
                truncateText="..."
                text={sanitize(threadQuestion.body)}
                textTruncateChild={
                  <StyledSpan onClick={handleTruncate}>more</StyledSpan>
                }
              />
            ) : (
              <StyledQuestionText>
                {sanitize(threadQuestion.body)}{" "}
                <StyledSpan onClick={handleTruncate}>less</StyledSpan>
              </StyledQuestionText>
            )}
          </div>
        </StyledThreadQuestion>
        {comments &&
          comments.map((comment) => (
            <ThreadAnswer key={comment.id} comment={comment} />
          ))}
      </div>
      <CommentsList questionId={questionId} />
    </Fragment>
  );
};

export default QuestionThread;
