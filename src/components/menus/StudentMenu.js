import React, { useState, useContext, Fragment } from "react";
import { ThreadContext } from "../../context/thread/ThreadContext";
import { QuestionContext } from "../../context/question/QuestionContext";
import Modal from "../../components/layout/Modal";
import { StyledStudentMenu } from "./StyledMenus";

import {
  StyledTransparentButton,
  StyledPurpleButton,
  StyledTextarea,
  StyledModalBody,
} from "../../styles/GlobalStyledComponents";

const StudentMenu = ({ question, comment, toggleMenu, threadQuestion }) => {
  const { updateComment, updateThreadQuestion } = useContext(ThreadContext);
  const { updateQuestion } = useContext(QuestionContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(
    question ? question.title : ""
  );
  const [questionBody, setQuestionBody] = useState(
    question ? question.body : ""
  );
  const [commentBody, setCommentBody] = useState(comment && comment.body);

  const handleCancel = () => {
    setModalOpen(!modalOpen);
    toggleMenu();
  };

  const handleQuestionUpdate = (question) => {
    const data = {
      title: questionTitle,
      body: questionBody,
      userId: question.userId,
    };
    updateQuestion(question, data);

    setModalOpen(!modalOpen);
    toggleMenu();
  };

  const handleThreadQuestionUpdate = (question) => {
    const data = {
      title: questionTitle,
      body: questionBody,
      userId: question.userId,
    };

    updateThreadQuestion(question, data);
    setModalOpen(!modalOpen);
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
    setModalOpen(!modalOpen);
    toggleMenu();
  };

  if (comment) {
    return (
      <Fragment>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <StyledModalBody>
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
          </StyledModalBody>
        </Modal>

        <StyledStudentMenu>
          <p onClick={() => setModalOpen(!modalOpen)}>Edit Comment</p>
        </StyledStudentMenu>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <StyledModalBody>
          <form
            onSubmit={
              threadQuestion
                ? (e) => {
                    e.preventDefault();
                    handleThreadQuestionUpdate(question);
                  }
                : (e) => {
                    e.preventDefault();
                    handleQuestionUpdate(question);
                  }
            }
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
        </StyledModalBody>
      </Modal>

      <StyledStudentMenu>
        <p onClick={() => setModalOpen(!modalOpen)}>Edit Question</p>
      </StyledStudentMenu>
    </Fragment>
  );
};

export default StudentMenu;
