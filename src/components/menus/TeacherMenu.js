import React, { useState, Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { deleteQuestion } from "../../api/questionsApi";
import { deleteComment } from "../../api/commentsApi";
import { selectAnswer } from "../../api/commentsApi";
import { ErrorContext } from "../../context/ErrorContext";
import Error from "../errors/Error";
import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  reRenderList,
  toggleMenu,
  thread,
}) => {
  const { error, setError } = useContext(ErrorContext);
  const history = useHistory();
  const [answerId, setAnswerId] = useState(undefined);
  // const [error, setError] = useState(undefined);

  const replaceAnswer = async (id) => {
    //figure out how to handle situation where already have answer and want to replace, using state won't persist on sign out or reload
  };

  const chooseAnswer = async () => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedAnswer = await selectAnswer(comment.id, comment.questionId);

      if (updatedAnswer.error) {
        setError(updatedAnswer.error);
        setTimeout(() => {
          toggleMenu();
          setError(undefined);
        }, 2500);
      } else if (updatedAnswer.data.answer) {
        setAnswerId(comment.id);
        reRenderList();
        toggleMenu();
      }
    }
  };

  const deleteUserQuestion = async () => {
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
        //if question is being deleted within a thread, send to home, otherwise re-render question list
        thread ? history.push("/challenge") : reRenderList();
      }
    }
  };

  const deleteUserComment = async () => {
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

        reRenderList();
      }
    }
  };

  if (question) {
    return (
      <Fragment>
        {error ? (
          <Error />
        ) : (
          <StyledTeacherMenu>
            <StyledParagraph onClick={deleteUserQuestion}>
              Remove Post
            </StyledParagraph>
          </StyledTeacherMenu>
        )}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {error ? (
        <Error />
      ) : (
        <StyledTeacherMenu>
          <StyledParagraph onClick={chooseAnswer}>
            Promote as Answer
          </StyledParagraph>
          <hr />
          <StyledParagraph onClick={deleteUserComment}>
            Remove Post
          </StyledParagraph>
        </StyledTeacherMenu>
      )}
    </Fragment>
  );
};

export default TeacherMenu;
