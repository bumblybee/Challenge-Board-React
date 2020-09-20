import React, { useState, useContext, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { submitProject, editProject, getProject } from "../../api/projectsApi";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import Modal from "../../components/layout/Modal";
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
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const history = useHistory();

  //Handles modal
  const [isOpen, setIsOpen] = useState(false);
  //Handles submission confirmation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectData, setProjectData] = useState({
    githubLink: "",
    additionalLink: "",
    comment: "",
    userData: {},
  });
  const [priorProject, setPriorProject] = useState({
    githubLink: "",
    additionalLink: "",
    comment: "",
    updatedAt: "",
  });

  const hasProject = user && user.projects && user.projects.length;

  const projectDate = moment(priorProject.updatedAt).format("L");
  const projectTime = moment(priorProject.updatedAt).format("h:mm");

  useEffect(() => {
    getUserProject();
  }, []);

  const getUserProject = async () => {
    const project = await getProject();
    project !== null &&
      setPriorProject({
        id: project.id,
        githubLink: project.githubLink,
        additionalLink: project.additionalLink,
        comment: project.comment,
        updatedAt: project.updatedAt,
      });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setProjectData({ ...projectData, userData: user });
    const submission = await submitProject(projectData);

    if (submission.error || !submission) {
      setError(submission.error);
      setIsOpen(!isOpen);
    } else {
      // getCurrentUser();
      setIsSubmitted(true);

      setIsOpen(!isOpen);
    }
  };

  const handleEditedSubmission = async (e) => {
    e.preventDefault();

    const projectId = priorProject.id;
    const data = { ...priorProject, userData: user };
    const editedSubmission = await editProject(projectId, data);

    if (editedSubmission.error || !editedSubmission) {
      setError(editedSubmission.error);
      setIsOpen(!isOpen);
    } else if (editedSubmission.data[0] === 1) {
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
                hasProject ? handleEditedSubmission : handleProjectSubmit
              }
              id="submit-form"
            >
              <input
                onChange={(e) =>
                  hasProject
                    ? setPriorProject({
                        ...priorProject,
                        githubLink: e.target.value,
                      })
                    : setProjectData({
                        ...projectData,
                        githubLink: e.target.value,
                      })
                }
                type="url"
                title="Link starts with https://"
                id="githubLink"
                placeholder="Github Link"
                value={
                  hasProject ? priorProject.githubLink : projectData.githubLink
                }
                required
                noValidate
              ></input>
              <input
                onChange={(e) =>
                  hasProject
                    ? setPriorProject({
                        ...priorProject,
                        additionalLink: e.target.value,
                      })
                    : setProjectData({
                        ...projectData,
                        additionalLink: e.target.value,
                      })
                }
                title="Link starts with https://"
                type="url"
                placeholder="Additional Link (optional)"
                value={
                  hasProject
                    ? priorProject.additionalLink
                    : projectData.additionalLink
                }
              ></input>
              <textarea
                onChange={(e) =>
                  hasProject
                    ? setPriorProject({
                        ...priorProject,
                        comment: e.target.value,
                      })
                    : setProjectData({
                        ...projectData,
                        comment: e.target.value,
                      })
                }
                rows="5"
                placeholder="Comments (optional)"
                value={hasProject ? priorProject.comment : projectData.comment}
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

      {hasProject ? (
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
              Project submitted at {projectTime} on {projectDate}
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
