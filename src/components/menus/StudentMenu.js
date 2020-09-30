import React, { useState, useContext, Fragment } from "react";
import { ModalContext } from "../../context/modal/ModalContext";
import { ThreadContext } from "../../context/thread/ThreadContext";
import { QuestionContext } from "../../context/question/QuestionContext";
import { StyledStudentMenu } from "./StyledMenus";

import {
  StyledTransparentButton,
  StyledPurpleButton,
  StyledTextarea,
} from "../../styles/GlobalStyledComponents";
import Modal from "../../components/layout/Modal";

const StudentMenu = ({ question, comment, toggleMenu }) => {
  const { updateComment } = useContext(ThreadContext);
  const { updateQuestion } = useContext(QuestionContext);
  const { showEditQuestionModal, toggleEditQuestionModal } = useContext(
    ModalContext
  );

  const [questionTitle, setQuestionTitle] = useState(
    question ? question.title : ""
  );
  const [questionBody, setQuestionBody] = useState(
    question ? question.body : ""
  );
  const [commentBody, setCommentBody] = useState(comment && comment.body);

  const handleCancel = () => {
    toggleEditQuestionModal();
    toggleMenu();
  };

  const handleQuestionUpdate = (e) => {
    e.preventDefault();
    const data = {
      title: questionTitle,
      body: questionBody,
      userId: question.userId,
    };
    updateQuestion(question, data);
    toggleEditQuestionModal();
    toggleMenu();
  };

  const handleCommentUpdate = (e) => {
    e.preventDefault();
    const data = {
      body: commentBody,
      userId: comment.userId,
      questionId: comment.questionId,
    };
    updateComment(comment, data);
    toggleEditQuestionModal();
    toggleMenu();
  };

  if (comment) {
    if (showEditQuestionModal) {
      return (
        <Modal studentMenu={true}>
          <div className="modal-body">
            <form onSubmit={handleCommentUpdate}>
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
          <p onClick={() => toggleEditQuestionModal()}>Edit Comment</p>
        </StyledStudentMenu>
      );
    }
  }

  return (
    <Fragment>
      {showEditQuestionModal ? (
        <Modal>
          <div className="modal-body">
            <form onSubmit={handleQuestionUpdate}>
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
                rows="7"
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
          <p onClick={() => toggleEditQuestionModal()}>Edit Question</p>
        </StyledStudentMenu>
      )}
    </Fragment>
  );
};

export default StudentMenu;
