import React, { useState, useEffect, useContext, Fragment } from "react";
import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { createQuestion } from "../../api/questionsApi";
import { getQuestions } from "../../api/questionsApi";

import QuestionCard from "./QuestionCard";
import Modal from "../../layout/Modal";

const QuestionsList = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
    isAnswered: false,
  });

  //TODO: wire up isAnswered

  useEffect(() => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  }, [isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: newQuestion.title,
      body: newQuestion.body,
      isAnswered: newQuestion.isAnswered,
    };

    //

    if (user) {
      await createQuestion(data);

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
                value={newQuestion.title}
                id="question-input"
                name="question"
                type="text"
                placeholder="Question"
                maxLength="100"
                required
              ></input>
              <textarea
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
              ></textarea>
              <div className="modal-footer">
                <button
                  className="close-modal"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </button>
                <button id="post-question-button" type="submit">
                  Post
                </button>
              </div>
            </form>
          </div>{" "}
        </Modal>
      )}

      <div className="discussion-header-container">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          <h1>Ask a Question</h1>
        </div>
        {user ? (
          <button className="modal-button" onClick={() => setIsOpen(!isOpen)}>
            Post a Question
          </button>
        ) : (
          <button
            className="modal-button"
            onClick={() => history.push("/login")}
          >
            Log in to Post a Question
          </button>
        )}
      </div>
      <div className="questions-container">
        <ul className="questions-thread">
          {questions.map((question, index) => (
            <QuestionCard question={question} key={index} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default QuestionsList;
