import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { deleteQuestion, deleteComment } from "../../api/deletePostApi";
import { selectAnswer } from "../../api/questionsApi";
import Error from "../errors/Error";
import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  reRenderList,
  toggleMenu,
  thread,
}) => {
  const history = useHistory();
  const [answer, setAnswer] = useState(false);
  const [error, setError] = useState(undefined);
  const [showError, setShowError] = useState(true);

  const chooseAnswer = async () => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedAnswer = await selectAnswer(comment.id, comment.questionId);
      console.log(updatedAnswer);

      if (updatedAnswer.error) {
        setError(updatedAnswer.error);
        setTimeout(() => {
          toggleMenu();
          setShowError(false);
        }, 2000);
      } else if (updatedAnswer.data.answer) {
        setAnswer(true);
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
          setShowError(false);
        }, 2000);
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
      console.log(deletedComment);
      if (deletedComment.error) {
        setError(deletedComment.error);
        setTimeout(() => {
          toggleMenu();
          setShowError(false);
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
        {error && showError ? (
          <Error>
            <div>{error}</div>
          </Error>
        ) : (
          <StyledTeacherMenu>
            <p onClick={deleteUserQuestion}>Remove Post</p>
          </StyledTeacherMenu>
        )}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {error && showError ? (
        <Error>
          <div>{error}</div>
        </Error>
      ) : (
        <StyledTeacherMenu answer={answer}>
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
