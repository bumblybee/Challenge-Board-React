import React, { useState, useContext, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { submitProject, editProject, getProject } from "../../api/projectsApi";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import Modal from "../../components/layout/Modal";
import {
  StyledHeading,
  StyledPurpleButton,
  StyledTransparentButton,
} from "../../styles/GlobalStyledComponents";
import * as sc from "./StyledSubmissionArea";

const SubmissionArea = () => {
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const history = useHistory();

  //Handles modal
  const [isOpen, setIsOpen] = useState(false);
  //Handles submission confirmation
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [initialProject, setInitialProject] = useState({
    githubLink: "",
    additionalLink: "",
    comment: "",
  });
  const [hasPriorProject, setHasPriorProject] = useState(false);
  const [priorProject, setPriorProject] = useState({});
  const [projectTimestamp, setProjectTimestamp] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    getUserProject();

    //eslint-disable-next-line
  }, []);

  const getUserProject = async () => {
    const res = await getProject();
    if (res && res.error) {
      return;
    }

    if (res && res.data && res.data.project) {
      const project = res.data.project;

      if (project !== null) {
        setPriorProject(project);
        setHasPriorProject(true);

        setProjectTimestamp({
          ...projectTimestamp,
          date: moment(project.updatedAt).format("L"),
          time: moment(project.updatedAt).format("h:mm"),
        });
      }
    }
  };

  const submitInitialProject = async (e) => {
    e.preventDefault();

    const submission = await submitProject(initialProject);

    if (submission.error || !submission) {
      setError(submission.error);
      setIsOpen(!isOpen);
    } else {
      setIsSubmitted(true);
      setIsOpen(!isOpen);
      setHasPriorProject(true);
      setProjectTimestamp({
        ...projectTimestamp,
        date: moment(submission.updatedAt).format("L"),
        time: moment(submission.updatedAt).format("h:mm"),
      });
      setPriorProject(submission.data);
    }
  };

  const submitEditedProject = async (e) => {
    e.preventDefault();

    const projectId = priorProject.id;

    const editedProject = await editProject(projectId, priorProject);

    if (editedProject.error || !editedProject) {
      setError(editedProject.error);
      setIsOpen(!isOpen);
    } else {
      setIsSubmitted(true);
      setIsOpen(!isOpen);
      setProjectTimestamp({
        ...projectTimestamp,
        date: moment(editedProject.updatedAt).format("L"),
        time: moment(editedProject.updatedAt).format("h:mm"),
      });
    }
  };

  return (
    <sc.StyledSubmissionContainer>
      {isOpen && (
        <Modal>
          <div className="modal-header">
            <h1>Submit your Project</h1>
            <p>Provide your Github and any additional relevant links.</p>
          </div>
          <div className="modal-body">
            <form
              onSubmit={
                hasPriorProject ? submitEditedProject : submitInitialProject
              }
              id="submit-form"
            >
              <input
                onChange={(e) =>
                  hasPriorProject
                    ? setPriorProject({
                        ...priorProject,
                        githubLink: e.target.value,
                      })
                    : setInitialProject({
                        ...initialProject,
                        githubLink: e.target.value,
                      })
                }
                type="url"
                title="Link must start with https://"
                id="githubLink"
                placeholder="Github Link"
                value={
                  hasPriorProject
                    ? priorProject.githubLink
                    : initialProject.githubLink
                }
                required
                noValidate
                autoFocus
              ></input>
              <input
                onChange={(e) =>
                  hasPriorProject
                    ? setPriorProject({
                        ...priorProject,
                        additionalLink: e.target.value,
                      })
                    : setInitialProject({
                        ...initialProject,
                        additionalLink: e.target.value,
                      })
                }
                title="Link must start with https://"
                type="url"
                placeholder="Additional Link (optional)"
                value={
                  hasPriorProject
                    ? priorProject.additionalLink
                    : initialProject.additionalLink
                }
              ></input>
              <textarea
                onChange={(e) =>
                  hasPriorProject
                    ? setPriorProject({
                        ...priorProject,
                        comment: e.target.value,
                      })
                    : setInitialProject({
                        ...initialProject,
                        comment: e.target.value,
                      })
                }
                rows="5"
                placeholder="Comments (optional)"
                value={
                  hasPriorProject
                    ? priorProject.comment
                    : initialProject.comment
                }
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
          <sc.StyledModalBody>
            <sc.StyledConfirmationH1>
              Your project has been Submitted!
            </sc.StyledConfirmationH1>
            <sc.StyledConfirmationParagraph>
              Look for an email confirmation shortly.
            </sc.StyledConfirmationParagraph>
          </sc.StyledModalBody>
          <div className="modal-footer">
            <StyledPurpleButton onClick={() => setIsSubmitted(false)}>
              Close
            </StyledPurpleButton>
          </div>
        </Modal>
      )}

      {hasPriorProject && user ? (
        <sc.StyledSubmissionContent>
          <StyledHeading>SUBMISSION</StyledHeading>
          <sc.StyledH1>Submit Your Project</sc.StyledH1>
          <p>When you're ready, submit your Github link here for review.</p>
          <sc.StyledEditSubmission>
            <StyledPurpleButton
              onClick={() => setIsOpen(!isOpen)}
              className="modal-button edit-submission-button"
              id="submit-button"
              editButton={true}
            >
              Edit Submission
            </StyledPurpleButton>
            <sc.StyledTimestampParagraph>
              Project submitted at {projectTimestamp.time} on{" "}
              {projectTimestamp.date}
            </sc.StyledTimestampParagraph>
          </sc.StyledEditSubmission>
        </sc.StyledSubmissionContent>
      ) : (
        <sc.StyledSubmissionContent>
          <StyledHeading>SUBMISSION</StyledHeading>
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
              Log In to Submit Project
            </StyledPurpleButton>
          )}
        </sc.StyledSubmissionContent>
      )}
    </sc.StyledSubmissionContainer>
  );
};

export default SubmissionArea;
