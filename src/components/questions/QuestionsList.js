import React, { useState, useContext, useEffect, Fragment } from "react";

import loader from "../../assets/loading.gif";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";
import { QuestionContext } from "../../context/question/QuestionContext";

import QuestionCard from "./QuestionCard";
import Modal from "../../components/layout/Modal";

import * as sc from "../../styles/GlobalStyledComponents";

import {
  StyledDiscussionHeaderContainer,
  StyledQuestionsContainer,
  StyledQuestionList,
  StyledQuestionsLoader,
} from "./StyledQuestions";

const QuestionsList = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const {
    questions,
    questionsLoading,
    submitNewQuestion,
    fetchQuestions,
  } = useContext(QuestionContext);
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

  if (questionsLoading)
    return <StyledQuestionsLoader src={loader} alt="loading" />;

  return (
    <Fragment>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <sc.StyledModalHeader>
          <h1>Post a Question</h1>
          <p>Make sure to add enough detail to provide context for others.</p>
        </sc.StyledModalHeader>
        <sc.StyledModalBody>
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
            <sc.StyledTextarea
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
            ></sc.StyledTextarea>
            <sc.StyledModalFooter>
              <sc.StyledTransparentButton
                onClick={() => setModalOpen(!modalOpen)}
              >
                Cancel
              </sc.StyledTransparentButton>
              <sc.StyledPurpleButton id="post-question-button" type="submit">
                Post
              </sc.StyledPurpleButton>
            </sc.StyledModalFooter>
          </form>
        </sc.StyledModalBody>{" "}
      </Modal>

      <StyledDiscussionHeaderContainer>
        <div className="discussion-header">
          <sc.StyledHeading>DISCUSSION</sc.StyledHeading>
          {user && user.role === "Teacher" ? (
            <h1>Challenge Questions</h1>
          ) : (
            <h1>Ask a Question</h1>
          )}
        </div>
        {user && user.role === "Teacher" ? (
          ""
        ) : user && user.role === "Student" ? (
          <sc.StyledPurpleButton
            className="modal-button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Post a Question
          </sc.StyledPurpleButton>
        ) : (
          <sc.StyledPurpleButton
            className="modal-button"
            onClick={() => history.push("/login")}
          >
            Log In to Post a Question
          </sc.StyledPurpleButton>
        )}
      </StyledDiscussionHeaderContainer>
      <StyledQuestionsContainer>
        <StyledQuestionList>
          {questions &&
            questions.map((question) => (
              <QuestionCard question={question} key={question.id} />
            ))}
        </StyledQuestionList>
      </StyledQuestionsContainer>
    </Fragment>
  );
};

export default QuestionsList;
