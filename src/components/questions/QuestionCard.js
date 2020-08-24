import React, { useContext, useState } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import TeacherMenu from "../../layout/TeacherMenu";

const QuestionCard = ({ question }) => {
  const date = moment(question.createdAt).format("L");
  const sanitize = DOMPurify.sanitize;
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const openTeacherMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="question-card">
      <div className="question-header">
        <div className="name">{question.user.username}</div>
        <div className="created-at">{date}</div>
        <div className="icons" style={{ position: "relative" }}>
          {question.isAnswered ? (
            <i
              className="fas fa-bookmark fa-lg"
              style={{ marginRight: "2rem" }}
            ></i>
          ) : (
            ""
          )}
          {!user
            ? ""
            : user.role === "Teacher" && (
                <i
                  onClick={openTeacherMenu}
                  className="fas fa-ellipsis-h fa-lg"
                  style={
                    isOpen
                      ? {
                          background: "#202225",
                        }
                      : {}
                  }
                ></i>
              )}
        </div>
        {isOpen && <TeacherMenu question={question}></TeacherMenu>}
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
        <div className="view-thread">
          <Link to={`/challenge/question/${question.id}`}>View Thread</Link>
        </div>
      </div>
    </li>
  );
};

export default QuestionCard;
