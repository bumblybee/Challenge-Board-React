import React, { useState, useContext, Fragment } from "react";
import { editQuestion } from "../../api/questionsApi";
import { editComment } from "../../api/commentsApi";
import { StyledStudentMenu } from "./StyledMenus";
import { ErrorContext } from "../../context/ErrorContext";
import {
  StyledTransparentButton,
  StyledPurpleButton,
  StyledTextarea,
} from "../../styles/GlobalStyledComponents";
import Modal from "../../components/layout/Modal";
import Error from "../errors/Error";

const StudentMenu = ({ question, comment, toggleMenu, reRenderList }) => {
  const [openModal, setOpenModal] = useState(false);
  const { error, setError } = useContext(ErrorContext);
  const [questionTitle, setQuestionTitle] = useState(
    question ? question.title : ""
  );

  const [questionBody, setQuestionBody] = useState(
    question ? question.body : ""
  );

  const [commentBody, setCommentBody] = useState(comment && comment.body);

  const updateQuestion = async (e) => {
    e.preventDefault();

    const data = {
      title: questionTitle,
      body: questionBody,
      userId: question.userId,
    };

    const editedQuestion = await editQuestion(question.id, data);

    if (editedQuestion.error) {
      setError(editedQuestion.error);
      setTimeout(() => {
        setError(undefined);
      }, 2500);
    } else if (editedQuestion.data[0] === 1) {
      setOpenModal(!openModal);
      toggleMenu();
      reRenderList();
    }
  };

  const updateComment = async (e) => {
    e.preventDefault();

    const data = {
      body: commentBody,
      userId: comment.userId,
    };

    const editedComment = await editComment(comment.id, data);

    if (editedComment.error) {
      setError(editedComment.error);
      setTimeout(() => {
        setError(undefined);
      }, 2500);
    } else if (editedComment.data[0] === 1) {
      setOpenModal(!openModal);
      toggleMenu();
      reRenderList();
    }
  };

  const handleCancel = () => {
    setOpenModal(!openModal);
    toggleMenu();
  };

  if (comment) {
    if (openModal) {
      return (
        <Modal>
          {error && <Error />}
          <div className="modal-body">
            <form onSubmit={updateComment}>
              <StyledTextarea
                onChange={(e) => setCommentBody(e.target.value)}
                id="body"
                rows="8"
                value={commentBody}
                autoFocus
              ></StyledTextarea>
              <div className="modal-footer">
                <StyledTransparentButton onClick={handleCancel}>
                  Cancel
                </StyledTransparentButton>
                <StyledPurpleButton>Submit</StyledPurpleButton>
              </div>
            </form>
          </div>
        </Modal>
      );
    } else {
      return (
        <StyledStudentMenu>
          <p onClick={() => setOpenModal(!openModal)}>Edit Post</p>
        </StyledStudentMenu>
      );
    }
  }

  return (
    <Fragment>
      {openModal ? (
        <Modal>
          {error && (
            <Error>
              <div>{error}</div>
            </Error>
          )}
          <div className="modal-body">
            <form onSubmit={updateQuestion}>
              <input
                onChange={(e) => setQuestionTitle(e.target.value)}
                type="text"
                id="title"
                value={questionTitle}
                autoFocus
              />
              <StyledTextarea
                onChange={(e) => setQuestionBody(e.target.value)}
                id="body"
                rows="6"
                value={questionBody}
              ></StyledTextarea>
              <div className="modal-footer">
                <StyledTransparentButton onClick={handleCancel}>
                  Cancel
                </StyledTransparentButton>
                <StyledPurpleButton>Submit</StyledPurpleButton>
              </div>
            </form>
          </div>
        </Modal>
      ) : (
        <StyledStudentMenu>
          <p onClick={() => setOpenModal(!openModal)}>Edit Post</p>
        </StyledStudentMenu>
      )}
    </Fragment>
  );
};

export default StudentMenu;
