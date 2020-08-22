import React, { useState } from "react";

import deletePost from "../api/deletePostApi";
import { selectAnswer } from "../api/questionsApi";

import { StyledTeacherMenu } from "../styles/styledComponents";

const TeacherMenu = ({ question, comment, reRenderList, openTeacherMenu }) => {
  const [answer, setAnswer] = useState(false);
  const chooseAnswer = async () => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedAnswer = await selectAnswer(comment.id, comment.questionId);
      updatedAnswer && setAnswer(true);
      reRenderList();
      openTeacherMenu();
    }
  };

  if (question) {
    return (
      <StyledTeacherMenu>
        <p>Remove Post</p>
      </StyledTeacherMenu>
    );
  }
  return (
    <StyledTeacherMenu answer={answer}>
      <p onClick={chooseAnswer} style={{ padding: "0.8rem 0" }}>
        Promote as Answer
      </p>
      <hr />
      <p style={{ padding: "0.8rem 0" }}>Remove Post</p>
    </StyledTeacherMenu>
  );
};

export default TeacherMenu;
