import React, { useState, useEffect, useContext, Fragment } from "react";

import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { createQuestion } from "../../api/questionsApi";
import { getQuestions } from "../../api/questionsApi";
import Error from "../../components/errors/Error";
import QuestionCard from "./QuestionCard";
import Modal from "../../layout/Modal";

import {
  StyledPurpleButton,
  StyledTransparentButton,
  StyledTextarea,
} from "../../styles/GlobalStyledComponents";

const QuestionsList = () => {
  //TODO: Remove post question btn if teacher
  //TODO: Bring in StyledTextArea
  const history = useHistory();

  const { user } = useContext(UserContext);
  const [error, setError] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
    isAnswered: false,
  });

  useEffect(() => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
    setIsSubmitted(false);
  }, [isSubmitted]);

  const reRenderList = () => {
    setIsSubmitted(!isSubmitted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: newQuestion.title,
      body: newQuestion.body,
    };

    //

    if (user) {
      const createdQuestion = await createQuestion(data);

      if (createdQuestion.error) {
        setError(createdQuestion.error);
        setIsOpen(!isOpen);
      } else if (createdQuestion.data.id) {
        setIsOpen(!isOpen);

        //set isSubmitted so list repopulates
        setIsSubmitted(true);

        //clear input after submit
        setNewQuestion({
          question: "",
          questionDetails: "",
        });

        history.push("/challenge");
      }
    }
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
            <form id="question-form" onSubmit={handleSubmit}>
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
      {error && (
        <Error>
          <div>{error}</div>
        </Error>
      )}
      <div className="discussion-header-container">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          <h1>Ask a Question</h1>
        </div>
        {user ? (
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
            Log in to Post a Question
          </StyledPurpleButton>
        )}
      </div>
      <div className="questions-container">
        <ul className="questions-thread">
          {questions.map((question, index) => (
            <QuestionCard
              question={question}
              reRenderList={reRenderList}
              key={index}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default QuestionsList;
