import React, { Fragment } from "react";

import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  deleteUserQuestion,
  promoteAnswer,
  demoteAnswer,
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
        {comment.isAnswer ? (
          <StyledParagraph onClick={() => demoteAnswer(comment)}>
            Demote Answer
          </StyledParagraph>
        ) : (
          <StyledParagraph onClick={() => promoteAnswer(comment)}>
            Promote as Answer
          </StyledParagraph>
        )}

        <hr />
        <StyledParagraph onClick={() => deleteUserComment(comment)}>
          Remove Post
        </StyledParagraph>
      </StyledTeacherMenu>
    </Fragment>
  );
};

export default TeacherMenu;
