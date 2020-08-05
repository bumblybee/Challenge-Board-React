import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { createQuestion } from "../../api/questionsApi.js";
import QuestionList from "./QuestionList";
import Modal from "../../layout/Modal";

const DiscussionArea = ({ questions, setQuestions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [newQuestion, setNewQuestion] = useState({
    username: "Sara London",
    question: "",
    questionDetails: "",
    isAnswered: false,
    commentCount: 0,
    createdAt: "2020-08-04T14:07:47.988-05",
  });

  // Should this be passed up to App and the api called there?
  // TODO: Dynamic data; context(?) for handling setQuestions state
  // TODO: make sure isAuth before allowing access to submit question
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: newQuestion.username,
      question: newQuestion.question,
      questionDetails: newQuestion.questionDetails,
      isAnswered: newQuestion.isAnswered,
      commentCount: newQuestion.commentCount,
      createdAt: newQuestion.createdAt,
    };
    setIsOpen(!isOpen);

    createQuestion(data);
    // How should I be handling this? New api call instead of passing props up?
    // setQuestions([data, ...questions]);

    //clear input after submit
    setNewQuestion({ ...newQuestion, question: "", questionDetails: "" });
    history.push("/challenge");
  };

  //TODO: create reusable component for form

  return (
    <div className="discussion-area">
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
                    question: e.target.value,
                  })
                }
                value={newQuestion.question}
                id="question-input"
                name="question"
                type="text"
                placeholder="Question"
                maxlength="100"
                required
              ></input>
              <textarea
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    questionDetails: e.target.value,
                  })
                }
                value={newQuestion.questionDetails}
                id="question-details"
                name="question-details"
                rows="8"
                placeholder="More Details"
              ></textarea>
              <div className="modal-footer">
                <a className="close-modal" onClick={() => setIsOpen(!isOpen)}>
                  Cancel
                </a>
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
        <button
          className="modal-button"
          id="question-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Post a Question
        </button>
      </div>

      <div className="questions-container">
        <QuestionList questions={questions} newQuestion={newQuestion} />
      </div>
    </div>
  );
};

export default withRouter(DiscussionArea);
