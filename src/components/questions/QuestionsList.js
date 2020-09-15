import React, { useState, useEffect, useContext, Fragment } from "react";

import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";
import { ErrorContext } from "../../context/errors/ErrorContext";
import { createQuestion } from "../../api/questionsApi";
import { getQuestions } from "../../api/questionsApi";
import { deleteQuestion } from "../../api/questionsApi";
import { editQuestion } from "../../api/questionsApi";

import QuestionCard from "./QuestionCard";
import Modal from "../../components/layout/Modal";

import {
  StyledPurpleButton,
  StyledTransparentButton,
  StyledTextarea,
} from "../../styles/GlobalStyledComponents";

const QuestionsList = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    body: "",
  });

  //TODO: get rid of refresh state and instead return questions from server and updated getQuestions
  useEffect(() => {
    getQuestions().then((data) => {
      setQuestions(data);
    });
  }, [refresh]);

  const submitNewQuestion = async (e) => {
    e.preventDefault();

    const data = {
      title: newQuestion.title,
      body: newQuestion.body,
    };

    if (user) {
      const createdQuestion = await createQuestion(data);

      if (createdQuestion.error) {
        setError(createdQuestion.error);
        setIsOpen(!isOpen);
        setTimeout(() => {
          setError(undefined);
        }, 2500);
      } else if (createdQuestion.data.id) {
        setIsOpen(!isOpen);
        setRefresh(!refresh);

        //clear input after submit
        setNewQuestion({
          question: "",
          questionDetails: "",
        });
      }
    }
  };

  const deleteUserQuestion = async (question) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const deletedQuestion = await deleteQuestion(question.id);

      if (deletedQuestion.error) {
        setError(deletedQuestion.error);
        setTimeout(() => {
          setError(undefined);
        }, 2500);
      } else if (deletedQuestion.data.deletedQuestion) {
        setRefresh(!refresh);
      }
    }
  };

  const updateQuestion = async (question, data) => {
    const editedQuestion = await editQuestion(question.id, data);

    if (editedQuestion.error) {
      setError(editedQuestion.error);
      setTimeout(() => {
        setError(undefined);
      }, 2500);
    } else if (editedQuestion.data[0] === 1) {
      setRefresh(!refresh);
    }
  };
  console.log(user);
  return (
    <Fragment>
      {isOpen && (
        <Modal>
          <div className="modal-header">
            <h1>Post a Question</h1>
            <p>Make sure to add enough detail to provide context for others.</p>
          </div>
          <div className="modal-body">
            <form id="question-form" onSubmit={submitNewQuestion}>
              <input
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    title: e.target.value,
                  })
                }
                value={newQuestion.title || ""}
                id="question-input"
                name="question"
                type="text"
                placeholder="Question"
                maxLength="100"
                required
              ></input>
              <StyledTextarea
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    body: e.target.value,
                  })
                }
                value={newQuestion.body}
                id="question-details"
                name="question-details"
                rows="8"
                placeholder="More Details"
                required
              ></StyledTextarea>
              <div className="modal-footer">
                <StyledTransparentButton
                  className="close-modal"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </StyledTransparentButton>
                <StyledPurpleButton id="post-question-button" type="submit">
                  Post
                </StyledPurpleButton>
              </div>
            </form>
          </div>{" "}
        </Modal>
      )}

      <div className="discussion-header-container">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          {user && user.role === "Teacher" ? (
            <h1>Challenge Questions</h1>
          ) : (
            <h1>Ask a Question</h1>
          )}
        </div>
        {user && user.role === "Teacher" ? (
          ""
        ) : user && user.role === "Student" ? (
          <StyledPurpleButton
            className="modal-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            Post a Question
          </StyledPurpleButton>
        ) : (
          <StyledPurpleButton
            className="modal-button"
            onClick={() => history.push("/login")}
          >
            Log in to Post a Question
          </StyledPurpleButton>
        )}
      </div>
      <div className="questions-container">
        <ul className="questions-thread">
          {questions.map((question) => (
            <QuestionCard
              question={question}
              deleteUserQuestion={deleteUserQuestion}
              updateQuestion={updateQuestion}
              key={question.id}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default QuestionsList;
