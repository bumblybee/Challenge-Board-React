import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThreadContext } from "../../context/thread/ThreadContext";
import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({
  question,
  comment,
  threadQuestion,
  deleteUserQuestion,
  toggleMenu,
}) => {
  const history = useHistory();
  const {
    deleteThreadQuestion,
    deleteUserComment,
    promoteAnswer,
    demoteAnswer,
  } = useContext(ThreadContext);

  if (question) {
    return (
      <Fragment>
        <StyledTeacherMenu>
          <StyledParagraph
            onClick={
              threadQuestion
                ? () => {
                    deleteThreadQuestion(question);
                    toggleMenu();
                    history.push("/challenge");
                  }
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
            <StyledParagraph
              onClick={() => {
                demoteAnswer(comment);
                toggleMenu();
              }}
            >
              Demote Answer
            </StyledParagraph>
            <hr></hr>
          </Fragment>
        ) : (
          //If question isn't already answered, give option to promote as answer
          !comment.question.isAnswered && (
            <Fragment>
              <StyledParagraph
                onClick={() => {
                  promoteAnswer(comment);
                  toggleMenu();
                }}
              >
                Promote as Answer
              </StyledParagraph>
              <hr></hr>
            </Fragment>
          )
        )}

        <StyledParagraph
          onClick={() => {
            deleteUserComment(comment);
            toggleMenu();
          }}
        >
          Remove Post
        </StyledParagraph>
      </StyledTeacherMenu>
    </Fragment>
  );
};

export default TeacherMenu;
