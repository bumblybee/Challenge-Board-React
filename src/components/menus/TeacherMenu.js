import React, { Fragment } from "react";

import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  thread,
  deleteThreadQuestion,
  deleteUserQuestion,
  deleteUserComment,
  promoteAnswer,
  demoteAnswer,
}) => {
  console.log(comment);
  if (question) {
    return (
      <Fragment>
        <StyledTeacherMenu>
          <StyledParagraph
            onClick={
              thread
                ? () => deleteThreadQuestion(question)
                : () => deleteUserQuestion(question)
            }
          >
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
          <Fragment>
            <StyledParagraph onClick={() => demoteAnswer(comment)}>
              Demote Answer
            </StyledParagraph>
            <hr></hr>
          </Fragment>
        ) : (
          //If question isn't already answered, give option to promote as answer
          !comment.question.isAnswered && (
            <Fragment>
              <StyledParagraph onClick={() => promoteAnswer(comment)}>
                Promote as Answer
              </StyledParagraph>
              <hr></hr>
            </Fragment>
          )
        )}

        <StyledParagraph onClick={() => deleteUserComment(comment)}>
          Remove Post
        </StyledParagraph>
      </StyledTeacherMenu>
    </Fragment>
  );
};

export default TeacherMenu;
