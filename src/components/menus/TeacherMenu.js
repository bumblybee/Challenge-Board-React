import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { deleteQuestion } from "../../api/questionsApi";

import { ErrorContext } from "../../context/ErrorContext";
import Error from "../errors/Error";
import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  reRenderList,
  toggleMenu,
  thread,
  chooseAnswer,
  deleteUserComment,
}) => {
  const { error, setError } = useContext(ErrorContext);
  const history = useHistory();

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

  if (question) {
    return (
      <Fragment>
        <StyledTeacherMenu>
          <StyledParagraph onClick={deleteUserQuestion}>
            Remove Post
          </StyledParagraph>
        </StyledTeacherMenu>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <StyledTeacherMenu>
        <StyledParagraph onClick={() => chooseAnswer(comment)}>
          Promote as Answer
        </StyledParagraph>
        <hr />
        <StyledParagraph onClick={() => deleteUserComment(comment)}>
          Remove Post
        </StyledParagraph>
      </StyledTeacherMenu>
    </Fragment>
  );
};

export default TeacherMenu;
