import React, { Fragment, useState, useEffect, useContext } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import Truncate from "react-truncate";
import { useHistory, useLocation } from "react-router-dom";

import { getQuestionThread } from "../../api/questionsApi";
import { createComment } from "../../api/commentsApi";
import { editComment } from "../../api/commentsApi";
import { deleteComment } from "../../api/commentsApi";
import { deleteQuestion } from "../../api/questionsApi";
import { selectAnswer } from "../../api/commentsApi";
import { deselectAnswer } from "../../api/commentsApi";
import { updateAnswer } from "../../api/questionsApi";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

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
} from "../questions/StyledQuestions";

const QuestionThread = () => {
  const [question, setQuestion] = useState({});
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState([]);

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
  }, [questionId]);

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

  const promoteAnswer = async (comment) => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedComments = await selectAnswer(
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
          setError(undefined);
        }, 2000);
      } else {
        setComments(updatedComments.data.comments);
      }
    }
  };

  const updateComment = async (comment, data) => {
    const editedComment = await editComment(comment.id, data);

    if (editedComment.error) {
      setError(editedComment.error);
      setTimeout(() => {
        setError(undefined);
      }, 2500);
    } else {
      setComments(editedComment.data.comments);
    }
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
      } else {
        toggleMenu();
        history.push("/challenge");
      }
    }
  };

  const updateIsAnswered = async (comment) => {
    const updatedQuestion = await updateAnswer(comment.questionId);

    if (updatedQuestion.error) {
      setError(updatedQuestion.error);
      setTimeout(() => {
        setError(undefined);
      }, 2000);
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
                threadQuestion={true}
              ></TeacherMenu>
            ) : isOpen && user.role === "Student" ? (
              <StudentMenu
                question={question}
                toggleMenu={toggleMenu}
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
        {comments &&
          comments.map((comment) => (
            <ThreadAnswer
              key={comment.id}
              comment={comment}
              demoteAnswer={demoteAnswer}
              deleteUserComment={deleteUserComment}
              updateIsAnswered={updateIsAnswered}
              updateComment={updateComment}
            />
          ))}
      </div>
      <CommentsList
        comments={comments}
        questionId={questionId}
        promoteAnswer={promoteAnswer}
        demoteAnswer={demoteAnswer}
        submitComment={submitComment}
        deleteUserComment={deleteUserComment}
        updateComment={updateComment}
      />
    </Fragment>
  );
};

export default QuestionThread;