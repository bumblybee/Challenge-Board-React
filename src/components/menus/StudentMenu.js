import React, { useState, Fragment } from "react";
import { editQuestion } from "../../api/questionsApi";
import { editComment } from "../../api/commentsApi";
import { StyledStudentMenu, StyledEditTextarea } from "./StyledMenus";
import {
  StyledTransparentButton,
  StyledPurpleButton,
} from "../../styles/GlobalStyledComponents";
import Modal from "../../layout/Modal";

const StudentMenu = ({ question, comment, toggleMenu, reRenderList }) => {
  const [openModal, setOpenModal] = useState(false);

  const [questionTitle, setQuestionTitle] = useState(
    question ? question.title : ""
  );

  const [questionBody, setQuestionBody] = useState(
    question ? question.body : ""
  );

  const [commentBody, setCommentBody] = useState(comment ? comment.body : "");

  const updateQuestion = async (e) => {
    e.preventDefault();

    const data = {
      title: questionTitle,
      body: questionBody,
      userId: question.userId,
    };

    const editedQuestion = await editQuestion(question.id, data);

    editedQuestion && setOpenModal(!openModal);
    editedQuestion && toggleMenu();
    editedQuestion && reRenderList();

    //TODO: handle error
  };

  const updateComment = async (e) => {
    e.preventDefault();

    const data = {
      body: commentBody,
      userId: comment.userId,
    };

    const editedComment = await editComment(comment.id, data);

    editedComment && setOpenModal(!openModal);
    //TODO: handle error

    editedComment && toggleMenu();
    editedComment && reRenderList();
  };

  if (comment) {
    if (openModal) {
      return (
        <Modal>
          <div className="modal-body">
            <form onSubmit={updateComment}>
              <StyledEditTextarea
                onChange={(e) => setCommentBody(e.target.value)}
                id="body"
                rows="8"
                value={commentBody}
              ></StyledEditTextarea>
              <div className="modal-footer">
                <StyledTransparentButton
                  onClick={() => setOpenModal(!openModal)}
                >
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
          <div className="modal-body">
            <form onSubmit={updateQuestion}>
              <input
                onChange={(e) => setQuestionTitle(e.target.value)}
                type="text"
                id="title"
                value={questionTitle}
              />
              <StyledEditTextarea
                onChange={(e) => setQuestionBody(e.target.value)}
                id="body"
                rows="6"
                value={questionBody}
              ></StyledEditTextarea>
              <div className="modal-footer">
                <StyledTransparentButton
                  onClick={() => setOpenModal(!openModal)}
                >
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
