import React, { Fragment, useState, useEffect, useContext } from "react";
import loader from "../../assets/loading.gif";

import moment from "moment";
import DOMPurify from "dompurify";

import { useHistory, useLocation } from "react-router-dom";

import { ThreadContext } from "../../context/thread/ThreadContext";
import { UserContext } from "../../context/user/UserContext";

import CommentsList from "./comments/CommentsList";
import ThreadAnswer from "./ThreadAnswer";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";

import {
  StyledHeading,
  StyledPurpleButton,
} from "../../styles/GlobalStyledComponents";

import {
  StyledThreadLoader,
  StyledThreadHeaderContainer,
} from "./StyledThread";

import * as sq from "../questions/StyledQuestions";

const QuestionThread = () => {
  const sanitize = DOMPurify.sanitize;
  const [isTruncated, setIsTruncated] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const { user } = useContext(UserContext);
  const { fetchThread, threadQuestion, comments, threadLoading } = useContext(
    ThreadContext
  );

  const date = moment(threadQuestion.createdAt).format("DD/MM/YYYY");

  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    let mounted = true;

    mounted && fetchThread(questionId);

    return () => (mounted = false);
  }, [questionId, fetchThread]);

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === threadQuestion.userId) {
      return (
        <sq.StyledMenuIcon
          menuOpen={menuOpen}
          inList={false}
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
        ></sq.StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (threadLoading) return <StyledThreadLoader src={loader} alt="loading" />;

  return (
    <Fragment>
      <StyledThreadHeaderContainer>
        <div>
          <StyledHeading>DISCUSSION</StyledHeading>
          <h1>Ask a Question</h1>
        </div>

        <StyledPurpleButton onClick={() => history.push("/challenge")}>
          Back
        </StyledPurpleButton>
      </StyledThreadHeaderContainer>

      <div>
        <sq.StyledThreadQuestion>
          <sq.StyledQuestionHeader>
            <sq.StyledName>
              {threadQuestion.user && threadQuestion.user.username}
            </sq.StyledName>
            <sq.StyledDate>{date}</sq.StyledDate>

            <sq.StyledIconsDiv>{user && renderMenuIcon()}</sq.StyledIconsDiv>
            {menuOpen && user !== null && user.role === "Teacher" ? (
              <TeacherMenu
                question={threadQuestion}
                threadQuestion={true}
                toggleMenu={toggleMenu}
              ></TeacherMenu>
            ) : menuOpen && user !== null && user.role === "Student" ? (
              <StudentMenu
                question={threadQuestion}
                toggleMenu={toggleMenu}
                threadQuestion={true}
              ></StudentMenu>
            ) : (
              ""
            )}
          </sq.StyledQuestionHeader>
          <sq.StyledQuestionBody>
            <sq.StyledQuestionTitle>
              {sanitize(threadQuestion.title)}
            </sq.StyledQuestionTitle>
            {isTruncated ? (
              <sq.StyledQuestionText>
                <sq.StyledTruncate
                  line={3}
                  element="div"
                  truncateText="..."
                  text={sanitize(threadQuestion.body)}
                  textTruncateChild={
                    <sq.StyledSpan onClick={handleTruncate}>more</sq.StyledSpan>
                  }
                />
              </sq.StyledQuestionText>
            ) : (
              <sq.StyledQuestionText>
                {sanitize(threadQuestion.body)}{" "}
                <sq.StyledSpan onClick={handleTruncate}>less</sq.StyledSpan>
              </sq.StyledQuestionText>
            )}
          </sq.StyledQuestionBody>
        </sq.StyledThreadQuestion>
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
