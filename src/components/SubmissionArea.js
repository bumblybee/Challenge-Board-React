import React, { useState } from "react";
import Modal from "./Modal";

const SubmissionArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="submission-container">
      {isOpen && (
        <Modal>
          {" "}
          <div className="modal-header">
            <h1>Submit your Project</h1>
            <p>Provide your Github and any additional relevant links.</p>
          </div>
          <div className="modal-body">
            <form id="submit-form">
              <input
                type="text"
                id="githubLink"
                placeholder="Github Link"
                required
              ></input>
              <input
                type="text"
                placeholder="Additional Link (optional)"
              ></input>
              <textarea rows="5" placeholder="Comments (optional)"></textarea>
              <div className="modal-footer">
                <a
                  className="close-modal"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  id="submit-project-button"
                  onClick={() => setIsSubmitted(!isSubmitted)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {isSubmitted && (
        <Modal>
          <div
            className="modal-body"
            style={{ height: "18rem", padding: "2rem" }}
          >
            <h1 style={{ marginTop: "6rem" }}>
              Your project has been Submitted!
            </h1>
            <p style={{ paddingTop: "5px" }}>
              Look for an email confirmation shortly.
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="close-modal"
              href="#"
              onClick={() => setIsSubmitted(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
      <h4 className="heading">SUBMISSION</h4>
      <h1>Submit Your Project</h1>
      <p>When you're ready, submit your Github link here for review.</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="modal-button"
        id="submit-button"
      >
        Submit Project
      </button>
    </div>
  );
};

export default SubmissionArea;
