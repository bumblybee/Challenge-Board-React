import React, { Fragment, useState, useEffect, useContext } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import Truncate from "react-truncate";
import { useHistory, useLocation } from "react-router-dom";

import { getQuestionThread } from "../../api/questionsApi";
import { createComment } from "../../api/commentsApi";
import { deleteComment } from "../../api/commentsApi";
import { deleteQuestion } from "../../api/questionsApi";
import { selectAnswer } from "../../api/commentsApi";
import { deselectAnswer } from "../../api/commentsApi";
import { UserContext } from "../../context/UserContext";
import { ErrorContext } from "../../context/ErrorContext";
import CommentsList from "../comments/CommentsList";
import CommentCard from "../comments/CommentCard";
import TeacherMenu from "../menus/TeacherMenu";
import StudentMenu from "../menus/StudentMenu";
import { StyledPurpleButton } from "../../styles/GlobalStyledComponents";

import {
  StyledSpan,
  StyledMenuIcon,
  StyledAnswerIcon,
  StyledThreadQuestion,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledDateDiv,
} from "./StyledQuestions";

//TODO: get rid of reRenderList
const QuestionThread = () => {
  const [question, setQuestion] = useState({});
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState([]);
  const [renderList, setRenderList] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const sanitize = DOMPurify.sanitize;

  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    const fetchThread = async () => {
      const data = await getQuestionThread(questionId);

      setQuestion(data.question);
      setComments(data.question.comments);
      setUserName(data.question.user.username);

      setDate(moment(data.question.createdAt).format("L"));
    };

    fetchThread();
  }, [questionId, renderList]);

  const reRenderList = () => {
    setRenderList(!renderList);
  };

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === question.userId) {
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

  const deleteThreadQuestion = async (question) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const deletedQuestion = await deleteQuestion(question.id);

      if (deletedQuestion.error) {
        setError(deletedQuestion.error);
        setTimeout(() => {
          toggleMenu();
          setError(undefined);
        }, 2500);
      } else if (deletedQuestion.data.deletedQuestion) {
        toggleMenu();
        history.push("/challenge");
      }
    }
  };

  const promoteAnswer = async (comment) => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedComments = await selectAnswer(
        comment.id,
        comment.questionId
      );
      console.log(updatedComments.data);
      if (updatedComments.error) {
        setError(updatedComments.error);
        setTimeout(() => {
          setError(undefined);
        }, 2500);
      } else if (updatedComments.data) {
        setComments(updatedComments.data.comments);
      }
    }
  };

  const demoteAnswer = async (comment) => {
    if (window.confirm("Are you sure you want to deselect this answer?")) {
      const updatedComments = await deselectAnswer(
        comment.id,
        comment.questionId
      );

      if (updatedComments.error) {
        setError(updatedComments.error);
        setTimeout(() => {
          setError(undefined);
        }, 2500);
      } else if (updatedComments.data) {
        setComments(updatedComments.data.comments);
      }
    }
  };

  const submitComment = async (questionId, newComment) => {
    if (user) {
      const updatedComments = await createComment(questionId, newComment);

      if (updatedComments.error) {
        setError(updatedComments.error);
        setTimeout(() => {
          setError(undefined);
        }, 2500);
      } else {
        setComments(updatedComments.data.comments);
      }
    }
  };

  const deleteUserComment = async (comment) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const updatedComments = await deleteComment(
        comment.id,
        comment.questionId
      );

      if (updatedComments.error) {
        setError(updatedComments.error);
        setTimeout(() => {
          toggleMenu();
          setError(undefined);
        }, 2000);
      } else if (updatedComments.data.comments) {
        setComments(updatedComments.data.comments);
      }
    }
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
            <div className="name">{username}</div>
            <StyledDateDiv className="created-at">{date}</StyledDateDiv>

            <div className="icons">{user && renderMenuIcon()}</div>
            {isOpen && user.role === "Teacher" ? (
              <TeacherMenu
                question={question}
                deleteThreadQuestion={deleteThreadQuestion}
                thread={true}
              ></TeacherMenu>
            ) : isOpen && user.role === "Student" ? (
              <StudentMenu
                question={question}
                toggleMenu={toggleMenu}
                reRenderList={reRenderList}
              ></StudentMenu>
            ) : (
              ""
            )}
          </div>
          <div className="question-body">
            <StyledQuestionTitle>
              {sanitize(question.title)}
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
                {sanitize(question.body)}
              </Truncate>
            ) : (
              <StyledQuestionText>
                {sanitize(question.body)}{" "}
                <StyledSpan onClick={handleTruncate}>less</StyledSpan>
              </StyledQuestionText>
            )}
          </div>
        </StyledThreadQuestion>

        {comments.map((comment, index) => {
          if (comment.isAnswer) {
            return (
              <div className="chosen-answer" key={index}>
                <StyledAnswerIcon className="fas fa-bookmark fa-lg"></StyledAnswerIcon>
                <div>
                  <CommentCard
                    comment={comment}
                    answer={true}
                    demoteAnswer={demoteAnswer}
                    deleteUserComment={deleteUserComment}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
      <CommentsList
        comments={comments}
        questionId={questionId}
        promoteAnswer={promoteAnswer}
        demoteAnswer={demoteAnswer}
        submitComment={submitComment}
        deleteUserComment={deleteUserComment}
      />
    </Fragment>
  );
};

export default QuestionThread;
