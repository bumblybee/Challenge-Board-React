import React, { useState, useContext, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Modal from "../../components/layout/Modal";
import { submitProject, editProject } from "../../api/projectsApi";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";
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

const SubmissionArea = () => {
  const { user, getCurrentUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [timestamp, setTimestamp] = useState({
    date: "",
    time: "",
  });
  const [projectData, setProjectData] = useState({
    githubLink: "",
    additionalLink: "",
    comment: "",
    userData: {},
  });

  const history = useHistory();

  useEffect(() => {
    if (user && user.projects && user.projects.length > 0) {
      setProjectData({
        githubLink: user.projects[0].githubLink,
        additionLink: user.projects[0].additionalLink,
        comment: user.projects[0].comment,
        userData: user,
      });
      setTimestamp({
        ...timestamp,
        date: moment(user.projects[0].updatedAt).format("L"),
        time: moment(user.projects[0].updatedAt).format("h:mm"),
      });
    }
    //eslint-disable-next-line
  }, [user]);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    const submission = await submitProject(projectData);

    if (submission.error || !submission) {
      setError(submission.error);
      setIsOpen(!isOpen);
    } else {
      getCurrentUser();
      setIsSubmitted(true);

      setIsOpen(!isOpen);
    }
  };

  const handleEditedSubmission = async (e) => {
    e.preventDefault();

    const projectId = user.projects[0].id;
    const editedSubmissionData = { ...projectData };
    const editedSubmission = await editProject(projectId, editedSubmissionData);

    if (editedSubmission.error || !editedSubmission) {
      setError(editedSubmission.error);
      setIsOpen(!isOpen);
    } else if (editedSubmission.data[0] === 1) {
      getCurrentUser();
      setIsSubmitted(true);

      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="submission-container">
      {isOpen && (
        <Modal>
          <div className="modal-header">
            <h1>Submit your Project</h1>
            <p>Provide your Github and any additional relevant links.</p>
          </div>
          <div className="modal-body">
            <form
              onSubmit={
                user.projects && user.projects.length
                  ? handleEditedSubmission
                  : handleProjectSubmit
              }
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
                noValidate
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

      {user && user.projects && user.projects.length ? (
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
          {user && user.role === "Teacher" ? (
            <Fragment>
              <h1>View Student Submissions</h1>
              <p>Project submissions page</p>
            </Fragment>
          ) : (
            <Fragment>
              <h1>Submit Your Project</h1>
              <p>When you're ready, submit your Github link here for review.</p>
            </Fragment>
          )}

          {user && user.role === "Student" ? (
            <StyledPurpleButton
              onClick={() => setIsOpen(!isOpen)}
              className="modal-button"
              id="submit-button"
            >
              Submit Project
            </StyledPurpleButton>
          ) : user && user.role === "Teacher" ? (
            <StyledPurpleButton
              onClick={(e) => e.preventDefault()}
              className="modal-button"
            >
              View Submissions
            </StyledPurpleButton>
          ) : (
            <StyledPurpleButton
              className="modal-button"
              onClick={() => history.push("/login")}
            >
              Log in to Submit Project
            </StyledPurpleButton>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionArea;
