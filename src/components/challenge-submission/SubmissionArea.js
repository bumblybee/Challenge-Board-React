import React, { useState } from "react";
import moment from "moment";
import Modal from "../../layout/Modal";
import { submitProject, editProject } from "../../api/projectsApi";

const SubmissionArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [submissionData, setSubmissionData] = useState();
  const [timestamp, setTimestamp] = useState({
    date: "",
    time: "",
  });
  const [projectData, setProjectData] = useState({
    githubLink: "",
    additionalLink: "",
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: handle http protocol at start of links

    const submission = await submitProject(projectData);

    if (submission) {
      setIsSubmitted(true);
      setShowEditButton(true);
      setIsOpen(!isOpen);
      setTimestamp({
        ...timestamp,

        date: moment(submission.createdAt).format("L"),
        time: moment(submission.createdAt).format("h:mm"),
      });
    }
    setSubmissionData(submission.data);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const userId = submissionData.userId;
    const projectId = submissionData.id;
    const editedSubmissionData = { ...projectData, userId };
    const editedSubmission = await editProject(projectId, editedSubmissionData);

    if (editedSubmission) {
      setIsSubmitted(true);
      setShowEditButton(true);

      setIsOpen(!isOpen);
      setTimestamp({
        ...timestamp,
        date: moment(editedSubmission.createdAt).format("L"),
        time: moment(editedSubmission.createdAt).format("h:mm"),
      });
    }
  };

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
            <form
              onSubmit={showEditButton ? handleEdit : handleSubmit}
              id="submit-form"
            >
              <input
                onChange={(e) =>
                  setProjectData({ ...projectData, githubLink: e.target.value })
                }
                type="url"
                title="Link starts with https://"
                id="githubLink"
                placeholder="Github Link"
                value={projectData.githubLink}
                required
                novalidate
              ></input>
              <input
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    additionalLink: e.target.value,
                  })
                }
                title="Link starts with https://"
                type="url"
                placeholder="Additional Link (optional)"
                value={projectData.additionalLink}
              ></input>
              <textarea
                onChange={(e) =>
                  setProjectData({ ...projectData, comment: e.target.value })
                }
                rows="5"
                placeholder="Comments (optional)"
                value={projectData.comment}
              ></textarea>
              <div className="modal-footer">
                <button
                  className="close-modal"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </button>
                <button type="submit" id="submit-project-button">
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
            <button onClick={() => setIsSubmitted(false)}>Close</button>
          </div>
        </Modal>
      )}

      {showEditButton ? (
        <div className="submission-content">
          <h4 className="heading">SUBMISSION</h4>
          <h1>Submit Your Project</h1>
          <p>When you're ready, submit your Github link here for review.</p>
          <div className="edit-submission">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="modal-button edit-submission-button"
              id="submit-button"
              style={{ marginRight: "1rem" }}
            >
              Edit Submission
            </button>
            <p
              style={{
                color: "#7d8088",
                marginTop: "auto",
                marginBottom: "0.5rem",
              }}
            >
              Project submitted at {timestamp.time} on {timestamp.date}{" "}
            </p>
          </div>
        </div>
      ) : (
        <div className="submission-content">
          <h4 className="heading">SUBMISSION</h4>
          <h1>Submit Your Project</h1>
          <p>When you're ready, submit your Github link here for review.</p>
          <button
            // TODO: add api call for project submission
            onClick={() => setIsOpen(!isOpen)}
            className="modal-button"
            id="submit-button"
          >
            Submit Project
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmissionArea;
