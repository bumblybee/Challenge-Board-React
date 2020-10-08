import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useClickOutside } from "../../hooks/clickOutside";
import { ErrorContext } from "../../context/error/ErrorContext";
import { ThreadContext } from "../../context/thread/ThreadContext";
import { QuestionContext } from "../../context/question/QuestionContext";
import { StyledTeacherMenu, StyledParagraph } from "./StyledMenus";

const TeacherMenu = ({ question, comment, threadQuestion, toggleMenu }) => {
  const menuRef = useClickOutside(() => toggleMenu());
  const history = useHistory();
  const { setError } = useContext(ErrorContext);
  const {
    deleteThreadQuestion,
    deleteUserComment,
    promoteAnswer,
    demoteAnswer,
  } = useContext(ThreadContext);

  const { deleteUserQuestion } = useContext(QuestionContext);

  const handlePromoteAnswer = async () => {
    const answer = await promoteAnswer(comment);

    answer && answer.error && setError(answer.error);

    toggleMenu();
  };

  const handleDeleteThreadQuestion = async (question) => {
    const deletedQuestion = await deleteThreadQuestion(question);

    deletedQuestion && deletedQuestion.data && history.push("/challenge");
  };

  const handleDeleteUserQuestion = async (question) => {
    await deleteUserQuestion(question);
  };

  if (question) {
    return (
      <Fragment>
        <StyledTeacherMenu ref={menuRef}>
          <StyledParagraph
            onClick={
              threadQuestion
                ? () => {
                    handleDeleteThreadQuestion(question);
                  }
                : () => handleDeleteUserQuestion(question)
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
      <StyledTeacherMenu menuREf={menuRef} isComment={true}>
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
              <StyledParagraph onClick={handlePromoteAnswer}>
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
