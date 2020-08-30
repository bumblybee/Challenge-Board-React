import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteQuestion, deleteComment } from "../../api/deletePostApi";
import { selectAnswer } from "../../api/questionsApi";

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

  const chooseAnswer = async () => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedAnswer = await selectAnswer(comment.id, comment.questionId);

      updatedAnswer && setAnswer(true);
      updatedAnswer && reRenderList();
      updatedAnswer && toggleMenu();
    }
  };

  const deleteUserQuestion = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const deletedQuestion = await deleteQuestion(question.id);
      console.log(deletedQuestion);
      if (deletedQuestion) {
        toggleMenu();
        //if question is being deleted within a thread, send to home, otherwise re-render question list
        thread ? history.push("/challenge") : reRenderList();
      }
    }
  };

  const deleteUserComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const deletedComment = await deleteComment(comment.id);
      if (deletedComment) {
        toggleMenu();

        reRenderList();
      }
    }
  };

  if (question) {
    return (
      <StyledTeacherMenu>
        <p onClick={deleteUserQuestion}>Remove Post</p>
      </StyledTeacherMenu>
    );
  }
  return (
    <StyledTeacherMenu answer={answer}>
      <StyledParagraph onClick={chooseAnswer}>
        Promote as Answer
      </StyledParagraph>
      <hr />
      <StyledParagraph onClick={deleteUserComment}>Remove Post</StyledParagraph>
    </StyledTeacherMenu>
  );
};

export default TeacherMenu;