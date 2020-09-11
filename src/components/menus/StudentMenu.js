import React, { useState, Fragment } from "react";

import { StyledStudentMenu } from "./StyledMenus";

import {
  StyledTransparentButton,
  StyledPurpleButton,
  StyledTextarea,
} from "../../styles/GlobalStyledComponents";
import Modal from "../../components/layout/Modal";

const StudentMenu = ({
  question,
  comment,
  toggleMenu,
  updateComment,
  updateQuestion,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const [questionTitle, setQuestionTitle] = useState(
    question ? question.title : ""
  );

  const [questionBody, setQuestionBody] = useState(
    question ? question.body : ""
  );

  const [commentBody, setCommentBody] = useState(comment && comment.body);

  const handleCancel = () => {
    setOpenModal(!openModal);
    toggleMenu();
  };

  if (comment) {
    if (openModal) {
      return (
        <Modal>
          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  body: commentBody,
                  userId: comment.userId,
                  questionId: comment.questionId,
                };
                updateComment(comment, data);
                setOpenModal(!openModal);
                toggleMenu();
              }}
            >
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
          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  title: questionTitle,
                  body: questionBody,
                  userId: question.userId,
                };
                updateQuestion(question, data);
                setOpenModal(!openModal);
                toggleMenu();
              }}
            >
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
