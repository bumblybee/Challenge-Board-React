import React, { Fragment, useState, useEffect, useContext } from "react";
import loading from "../../assets/loading.gif";
import moment from "moment";
import DOMPurify from "dompurify";
import Truncate from "react-truncate";

import { useHistory, useLocation } from "react-router-dom";

import { ThreadContext } from "../../context/thread/ThreadContext";
import { UserContext } from "../../context/user/UserContext";

import CommentsList from "./comments/CommentsList";
import ThreadAnswer from "./ThreadAnswer";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";

import {
  StyledPurpleButton,
  StyledLoader,
} from "../../styles/GlobalStyledComponents";

import {
  StyledSpan,
  StyledMenuIcon,
  StyledThreadQuestion,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledDateDiv,
} from "../questions/StyledQuestions";

const QuestionThread = () => {
  const sanitize = DOMPurify.sanitize;
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { user } = useContext(UserContext);
  const { fetchThread, threadQuestion, comments, isLoading } = useContext(
    ThreadContext
  );

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
            {isOpen && user.role === "Teacher" ? (
              <TeacherMenu
                question={threadQuestion}
                threadQuestion={true}
                toggleMenu={toggleMenu}
              ></TeacherMenu>
            ) : isOpen && user.role === "Student" ? (
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
                {sanitize(threadQuestion.body)}
              </Truncate>
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
      {isLoading ? (
        <StyledLoader isInThread={true} src={loading} alt="" />
      ) : (
        <CommentsList questionId={questionId} />
      )}
    </Fragment>
  );
};

export default QuestionThread;
