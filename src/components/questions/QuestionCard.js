import React, { useContext, useState } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import TeacherMenu from "../../layout/TeacherMenu";
import StudentMenu from "../../layout/StudentMenu";

const QuestionCard = ({ question, reRenderList }) => {
  const date = moment(question.createdAt).format("L");

  const sanitize = DOMPurify.sanitize;
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // If user is teacher or if user.id matches question.userId, render menu icon
  const renderMenuIcon = () => {
    if (user.role === "Teacher" || user.id === question.userId) {
      return (
        <i
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
          style={
            isOpen
              ? {
                  background: "#18191b",
                  padding: "1rem",
                  position: "absolute",
                  top: "-1rem",
                  right: "0",
                  borderTopRightRadius: "6px",
                }
              : { padding: "0 1rem" }
          }
        ></i>
      );
    } else {
      return null;
    }
  };

  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{question.user.username}</div>
        <div className="created-at">{date}</div>
        <div
          className="icons"
          style={{ position: "relative", background: isOpen && "#18191b" }}
        >
          {question.isAnswered ? (
            <i
              className="fas fa-bookmark fa-lg"
              style={{ marginRight: "1rem" }}
            ></i>
          ) : (
            ""
          )}
          {/* If there's a logged in user and that user is a teacher, or is a student with a question attached to their id, render menu icon */}
          {user && renderMenuIcon()}
        </div>

        {isOpen && user.role === "Teacher" ? (
          <TeacherMenu
            toggleMenu={toggleMenu}
            question={question}
            reRenderList={reRenderList}
          ></TeacherMenu>
        ) : isOpen && user.role === "Student" ? (
          <StudentMenu
            toggleMenu={toggleMenu}
            question={question}
            reRenderList={reRenderList}
          />
        ) : (
          ""
        )}
      </div>

      <div className="question-body">
        <p>{sanitize(question.title)}</p>
      </div>
      <div className="question-footer">
        <div className="comment-count">
          {question.comments.length}
          {question.comments.length > 1 || question.comments.length === 0
            ? " comments"
            : " comment"}
        </div>
        {/* TODO: link route to thread ID  */}
        <div className="view-thread" style={{ padding: "0 1rem 0" }}>
          <Link to={`/challenge/question/${question.id}`}>View Thread</Link>
        </div>
      </div>
    </li>
  );
};

export default QuestionCard;
