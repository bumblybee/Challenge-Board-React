import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { createQuestion, getQuestions } from "../api.js";
import QuestionList from "./QuestionList";
import Modal from "./Modal";

const DiscussionArea = withRouter(({ questions, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    username: "Sara London",
    question: "",
    questionDetails: "",
    isAnswered: false,
    commentCount: 0,
  });

  // TODO: fix so not reloading but question pops up
  const handleSubmit = async (e) => {
    const data = {
      username: questionData.username,
      question: questionData.question,
      questionDetails: questionData.questionDetails,
      isAnswered: questionData.isAnswered,
      commentCount: questionData.commentCount,
    };

    createQuestion(data);

    // setIsOpen(!isOpen);
    // history.push("/");
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
                  setQuestionData({
                    ...questionData,
                    question: e.target.value,
                  })
                }
                value={questionData.question}
                id="question-input"
                name="question"
                type="text"
                placeholder="Question"
                maxlength="100"
                required
              ></input>
              <textarea
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    questionDetails: e.target.value,
                  })
                }
                value={questionData.questionDetails}
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
        <QuestionList questions={questions} />
      </div>
    </div>
  );
});

export default DiscussionArea;