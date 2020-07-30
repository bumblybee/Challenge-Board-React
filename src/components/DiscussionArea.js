import React, { useState } from "react";
import QuestionList from "./QuestionList";
import Modal from "./Modal";

const DiscussionArea = ({ questions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div className="discussion-area">
      {isOpen && (
        <Modal>
          <div className="modal-header">
            <h1>Post a Question</h1>
            <p>Make sure to add enough detail to provide context for others.</p>
          </div>
          <div className="modal-body">
            <form id="question-form">
              <input
                id="question-input"
                type="text"
                placeholder="Question"
                maxlength="100"
                required
              ></input>
              <textarea
                id="question-details"
                rows="8"
                placeholder="More Details"
              ></textarea>
              <div className="modal-footer">
                <a
                  className="close-modal"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
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
};

export default DiscussionArea;
