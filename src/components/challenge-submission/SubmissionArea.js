import React, { useState, useContext, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

import moment from "moment";

import { submitProject, editProject, getProject } from "../../api/projectsApi";

import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/error/ErrorContext";

import Modal from "../../components/layout/Modal";
import {
  StyledHeading,
  StyledPurpleButton,
  StyledTransparentButton,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
} from "../../styles/GlobalStyledComponents";
import * as sc from "./StyledSubmissionArea";

const SubmissionArea = () => {
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const history = useHistory();

  //Handles modal
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  //Handles submission confirmation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [hasPriorProject, setHasPriorProject] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getUserProject = async () => {
      const res = await getProject();

      if (res && res.error) {
        return;
      }

      if (res && res.data && res.data.project) {
        const project = res.data.project;

        if (project !== null && mounted) {
          setProjectDetails(project);
          setHasPriorProject(true);
        }
      }
    };

    getUserProject();

    return () => {
      mounted = false;
    };
  }, []);

  const submitInitialProject = async (e) => {
    e.preventDefault();

    const submission = await submitProject(projectDetails);

    if (submission.error || !submission) {
      setError(submission.error);
      setModalOpen(!modalOpen);
    } else {
      setIsSubmitted(true);
      setModalOpen(!modalOpen);
      setConfirmationModalOpen(!confirmationModalOpen);
      setHasPriorProject(true);
      setProjectDetails(submission.data);
    }
  };

  const submitEditedProject = async (e) => {
    e.preventDefault();

    const projectId = projectDetails.id;

    const editedProject = await editProject(projectId, projectDetails);

    if (editedProject.error || !editedProject) {
      setError(editedProject.error);
      setModalOpen(!modalOpen);
    } else {
      setModalOpen(!modalOpen);
      setConfirmationModalOpen(!confirmationModalOpen);
      setIsSubmitted(true);
      setHasPriorProject(true);
      setProjectDetails(editedProject.data);
    }
  };

  return (
    <sc.StyledSubmissionContainer>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <StyledModalHeader>
          <h1>Submit your Project</h1>
          <p>Provide your Github and any additional relevant links.</p>
        </StyledModalHeader>
        <StyledModalBody>
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
              title="Link must start with https://github.com"
              id="githubLink"
              placeholder="Github Link"
              value={projectDetails.githubLink || ""}
              pattern="https:\/\/github.com\/[^\/]+\/[^\/]+"
              required
              noValidate
              autoFocus
            ></input>
            <input
              onChange={(e) =>
                setProjectDetails({
                  ...projectDetails,
                  additionalLink: e.target.value,
                })
              }
              title="Link must start with https://"
              type="url"
              placeholder="Additional Link (optional)"
              value={projectDetails.additionalLink || ""}
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
              value={projectDetails.comment || ""}
            ></textarea>
            <StyledModalFooter>
              <StyledTransparentButton
                href="#"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Cancel
              </StyledTransparentButton>
              <StyledPurpleButton type="submit" id="submit-project-button">
                Submit
              </StyledPurpleButton>
            </StyledModalFooter>
          </form>
        </StyledModalBody>
      </Modal>
      {isSubmitted && (
        <Modal
          confirmationModalOpen={confirmationModalOpen}
          setConfirmationModalOpen={setConfirmationModalOpen}
        >
          <sc.StyledModalBody>
            <sc.StyledConfirmationH1>
              Your project has been Submitted!
            </sc.StyledConfirmationH1>
            <sc.StyledConfirmationParagraph>
              Look for an email confirmation shortly.
            </sc.StyledConfirmationParagraph>
          </sc.StyledModalBody>
          <StyledModalFooter>
            <StyledPurpleButton
              onClick={() => {
                setIsSubmitted(false);
                setConfirmationModalOpen(!confirmationModalOpen);
              }}
            >
              Close
            </StyledPurpleButton>
          </StyledModalFooter>
        </Modal>
      )}

      {
        //Has prior project, show timestamp and edit button
        hasPriorProject && user ? (
          <sc.StyledSubmissionContent>
            <StyledHeading>SUBMISSION</StyledHeading>
            <sc.StyledH1>Submit Your Project</sc.StyledH1>
            <p>When you're ready, submit your Github link here for review.</p>
            <sc.StyledEditSubmission>
              <StyledPurpleButton
                onClick={() => setModalOpen(!modalOpen)}
                editButton={true}
              >
                Edit Submission
              </StyledPurpleButton>
              <sc.StyledTimestampParagraph>
                Project submitted at{" "}
                {moment(projectDetails.updatedAt).format("h:mm")} on{" "}
                {moment(projectDetails.updatedAt).format("L")}
              </sc.StyledTimestampParagraph>
            </sc.StyledEditSubmission>
          </sc.StyledSubmissionContent>
        ) : (
          //If teacher, show teacher heading and button
          <sc.StyledSubmissionContent>
            <StyledHeading>SUBMISSION</StyledHeading>
            {user &&
              (user.role === "Teacher" ? (
                <Fragment>
                  <sc.StyledH1>View Student Submissions</sc.StyledH1>
                  <p>Project submissions page</p>
                  <StyledPurpleButton
                    onClick={(e) => e.preventDefault()}
                    className="modal-button"
                  >
                    View Submissions
                  </StyledPurpleButton>
                </Fragment>
              ) : (
                //Not teacher and no prior project
                <Fragment>
                  <sc.StyledH1>Submit Your Project</sc.StyledH1>
                  <p>
                    When you're ready, submit your Github link here for review.
                  </p>
                  <StyledPurpleButton
                    onClick={() => setModalOpen(!modalOpen)}
                    className="modal-button"
                    id="submit-button"
                  >
                    Submit Project
                  </StyledPurpleButton>
                </Fragment>
              ))}

            {
              //Not logged in, show button to direct login

              !user && (
                <Fragment>
                  <sc.StyledH1>Submit Your Project</sc.StyledH1>
                  <p>
                    When you're ready, submit your Github link here for review.
                  </p>
                  <StyledPurpleButton
                    className="modal-button"
                    onClick={() => history.push("/signup")}
                  >
                    Sign In to Submit Project
                  </StyledPurpleButton>
                </Fragment>
              )
            }
          </sc.StyledSubmissionContent>
        )
      }
    </sc.StyledSubmissionContainer>
  );
};

export default SubmissionArea;
