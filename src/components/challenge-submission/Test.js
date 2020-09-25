import React, { useState, useContext, Fragment } from "react";
import { useQuery, useMutation, queryCache } from "react-query";
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

const Test = () => {
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const history = useHistory();

  //Handles modal
  const [isOpen, setIsOpen] = useState(false);

  //Handles display of submission confirmation message
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    githubLink: "",
    additionalLink: "",
    comment: "",
  });

  const [hasPriorProject, setHasPriorProject] = useState(false);

  const [projectTimestamp, setProjectTimestamp] = useState({
    date: "",
    time: "",
  });

  const getUserProject = async () => {
    const project = await getProject();
    console.log(project);
    if (project.data.project !== null) {
      setProjectDetails(project.data.project);
      setHasPriorProject(true);

      setProjectTimestamp({
        ...projectTimestamp,
        date: moment(project.data.project.updatedAt).format("L"),
        time: moment(project.data.project.updatedAt).format("h:mm"),
      });
    }

    return project;
  };

  const submitInitialProject = async (e) => {
    e.preventDefault();
    const submission = await submitProject(projectDetails);

    setHasPriorProject(true);
    setIsSubmitted(true);
    setIsOpen(!isOpen);

    return submission;
  };

  const submitEditedProject = async (e) => {
    e.preventDefault();

    const projectId = projectDetails.id;

    const editedProject = await editProject(projectId, projectDetails);

    setIsSubmitted(true);
    setIsOpen(!isOpen);
    setHasPriorProject(true);

    return editedProject;
  };

  const { data: project } = useQuery("project", getUserProject, {
    onError: () => console.log(project),
  });

  const [postNewProject] = useMutation(submitInitialProject, {
    onError: (submission) => {
      setIsOpen(!isOpen);
      setError(submission.error);
    },
    onSuccess: () => {
      queryCache.refetchQueries("project");
    },
  });

  const [postEditedProject] = useMutation(submitEditedProject, {
    onError: (error, editedProject, rollback) => {
      setIsOpen(!isOpen);
      setError(editedProject.error);
      rollback();
    },
    onSuccess: () => {
      queryCache.refetchQueries("project");
    },
  });

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
                hasPriorProject ? submitEditedProject : submitInitialProject
              }
              id="submit-form"
            >
              <input
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    githubLink: e.target.value,
                  })
                }
                type="url"
                title="Link starts with https://"
                id="githubLink"
                placeholder="Github Link"
                value={projectDetails.githubLink}
                required
                noValidate
              ></input>
              <input
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    additionalLink: e.target.value,
                  })
                }
                title="Link starts with https://"
                type="url"
                placeholder="Additional Link (optional)"
                value={projectDetails.additionalLink}
              ></input>
              <textarea
                onChange={(e) =>
                  setProjectDetails({
                    ...projectDetails,
                    comment: e.target.value,
                  })
                }
                rows="5"
                placeholder="Comments (optional)"
                value={projectDetails.comment}
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

      {hasPriorProject && user ? (
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
              Project submitted at {projectTimestamp.time} on{" "}
              {projectTimestamp.date}
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

export default Test;
