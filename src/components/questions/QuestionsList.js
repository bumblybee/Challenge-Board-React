import React, { useState, useContext, useEffect, Fragment } from "react";

import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";
import { QuestionContext } from "../../context/question/QuestionContext";

import QuestionCard from "./QuestionCard";
import Modal from "../../components/layout/Modal";

import {
  StyledHeading,
  StyledPurpleButton,
  StyledTransparentButton,
  StyledTextarea,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
} from "../../styles/GlobalStyledComponents";

import {
  StyledDiscussionHeaderContainer,
  StyledQuestionsContainer,
} from "./StyledQuestions";

const QuestionsList = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { questions, submitNewQuestion, fetchQuestions } = useContext(
    QuestionContext
  );
  const [modalOpen, setModalOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    let mounted = true;

    mounted && fetchQuestions();

    return () => (mounted = false);
  }, [fetchQuestions]);

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

    setModalOpen(!modalOpen);
    setNewQuestion({
      question: "",
      questionDetails: "",
    });
  };

  return (
    <Fragment>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <StyledModalHeader>
          <h1>Post a Question</h1>
          <p>Make sure to add enough detail to provide context for others.</p>
        </StyledModalHeader>
        <StyledModalBody>
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
            <StyledModalFooter>
              <StyledTransparentButton
                className="close-modal"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Cancel
              </StyledTransparentButton>
              <StyledPurpleButton id="post-question-button" type="submit">
                Post
              </StyledPurpleButton>
            </StyledModalFooter>
          </form>
        </StyledModalBody>{" "}
      </Modal>

      <StyledDiscussionHeaderContainer>
        <div className="discussion-header">
          <StyledHeading>DISCUSSION</StyledHeading>
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
            onClick={() => setModalOpen(!modalOpen)}
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
      </StyledDiscussionHeaderContainer>
      <StyledQuestionsContainer>
        <ul className="questions-thread">
          {questions.map((question) => (
            <QuestionCard question={question} key={question.id} />
          ))}
        </ul>
      </StyledQuestionsContainer>
    </Fragment>
  );
};

export default QuestionsList;
