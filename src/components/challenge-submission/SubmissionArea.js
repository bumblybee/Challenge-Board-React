import React, { useState } from "react";
import moment from "moment";
import Modal from "../../layout/Modal";
import { submitProject, editProject } from "../../api/projectsApi";
import {
  StyledPurpleButton,
  StyledTransparentButton,
} from "../../styles/GlobalStyledComponents";
import {
  StyledModalBody,
  StyledTimestampParagraph,
  StyledConfirmationH1,
  StyledConfirmationParagraph,
} from "./StyledSubmissionArea";

//TODO: Add isSubmitted to context?
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
                <StyledTransparentButton
                  className="close-modal"
                  href="#"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </StyledTransparentButton>
                <StyledPurpleButton type="submit" id="submit-project-button">
                  Submit
                </StyledPurpleButton>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {isSubmitted && (
        <Modal>
          <StyledModalBody className="modal-body">
            <StyledConfirmationH1>
              Your project has been Submitted!
            </StyledConfirmationH1>
            <StyledConfirmationParagraph>
              Look for an email confirmation shortly.
            </StyledConfirmationParagraph>
          </StyledModalBody>
          <div className="modal-footer">
            <StyledPurpleButton onClick={() => setIsSubmitted(false)}>
              Close
            </StyledPurpleButton>
          </div>
        </Modal>
      )}

      {showEditButton ? (
        <div className="submission-content">
          <h4 className="heading">SUBMISSION</h4>
          <h1>Submit Your Project</h1>
          <p>When you're ready, submit your Github link here for review.</p>
          <div className="edit-submission">
            <StyledPurpleButton
              onClick={() => setIsOpen(!isOpen)}
              className="modal-button edit-submission-button"
              id="submit-button"
              editButton={true}
            >
              Edit Submission
            </StyledPurpleButton>
            <StyledTimestampParagraph>
              Project submitted at {timestamp.time} on {timestamp.date}{" "}
            </StyledTimestampParagraph>
          </div>
        </div>
      ) : (
        <div className="submission-content">
          <h4 className="heading">SUBMISSION</h4>
          <h1>Submit Your Project</h1>
          <p>When you're ready, submit your Github link here for review.</p>
          <StyledPurpleButton
            onClick={() => setIsOpen(!isOpen)}
            className="modal-button"
            id="submit-button"
          >
            Submit Project
          </StyledPurpleButton>
        </div>
      )}
    </div>
  );
};

export default SubmissionArea;
