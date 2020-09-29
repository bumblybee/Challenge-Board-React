import React, { useState, useContext, useEffect, Fragment } from "react";

import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";
import { QuestionContext } from "../../context/question/QuestionContext";

import QuestionCard from "./QuestionCard";
import Modal from "../../components/layout/Modal";

import {
  StyledPurpleButton,
  StyledTransparentButton,
  StyledTextarea,
} from "../../styles/GlobalStyledComponents";

const QuestionsList = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { questions, submitNewQuestion, fetchQuestions } = useContext(
    QuestionContext
  );
  const [isOpen, setIsOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchQuestions();
    //eslint-disable-next-line
  }, []);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    const data = {
      title: newQuestion.title,
      body: newQuestion.body,
    };

    const getUpdatedQuestions = await submitNewQuestion(data);

    getUpdatedQuestions &&
      getUpdatedQuestions.error &&
      setError(getUpdatedQuestions.error);
    setIsOpen(!isOpen);
    setNewQuestion({
      question: "",
      questionDetails: "",
    });
  };

  return (
    <Fragment>
      {isOpen && (
        <Modal>
          <div className="modal-header">
            <h1>Post a Question</h1>
            <p>Make sure to add enough detail to provide context for others.</p>
          </div>
          <div className="modal-body">
            <form id="question-form" onSubmit={handleSubmitQuestion}>
              <input
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    title: e.target.value,
                  })
                }
                value={newQuestion.title || ""}
                id="question-input"
                name="question"
                type="text"
                placeholder="Question"
                maxLength="100"
                autoFocus
                required
              ></input>
              <StyledTextarea
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    body: e.target.value,
                  })
                }
                value={newQuestion.body}
                id="question-details"
                name="question-details"
                rows="8"
                placeholder="More Details"
                required
              ></StyledTextarea>
              <div className="modal-footer">
                <StyledTransparentButton
                  className="close-modal"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </StyledTransparentButton>
                <StyledPurpleButton id="post-question-button" type="submit">
                  Post
                </StyledPurpleButton>
              </div>
            </form>
          </div>{" "}
        </Modal>
      )}

      <div className="discussion-header-container">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          {user && user.role === "Teacher" ? (
            <h1>Challenge Questions</h1>
          ) : (
            <h1>Ask a Question</h1>
          )}
        </div>
        {user && user.role === "Teacher" ? (
          ""
        ) : user && user.role === "Student" ? (
          <StyledPurpleButton
            className="modal-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            Post a Question
          </StyledPurpleButton>
        ) : (
          <StyledPurpleButton
            className="modal-button"
            onClick={() => history.push("/login")}
          >
            Log In to Post a Question
          </StyledPurpleButton>
        )}
      </div>
      <div className="questions-container">
        <ul className="questions-thread">
          {questions.map((question) => (
            <QuestionCard question={question} key={question.id} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default QuestionsList;
