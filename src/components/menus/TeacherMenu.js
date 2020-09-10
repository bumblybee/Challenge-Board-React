import React, { Fragment } from "react";

import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  deleteUserQuestion,
  chooseAnswer,
  deleteUserComment,
}) => {
  if (question) {
    return (
      <Fragment>
        <StyledTeacherMenu>
          <StyledParagraph onClick={() => deleteUserQuestion(question)}>
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
