import React, { Fragment, useState, useEffect, useContext } from "react";
import moment from "moment";
import DOMPurify from "dompurify";
import Truncate from "react-truncate";
import { getQuestionThread } from "../../api/questionsApi";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CommentsList from "../comments/CommentsList";
import CommentCard from "../comments/CommentCard";
import TeacherMenu from "../../layout/TeacherMenu";
import { StyledSpan } from "../../styles/styledComponents";

const QuestionThread = () => {
  const [question, setQuestion] = useState({});
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState([]);
  const [renderList, setRenderList] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const sanitize = DOMPurify.sanitize;

  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    const fetchThread = async () => {
      const data = await getQuestionThread(questionId);
      setQuestion(data.question);
      setComments(data.question.comments);
      setUserName(data.question.user.username);

      setDate(moment(data.question.createdAt).format("L"));
    };

    fetchThread();
  }, [questionId, renderList]);

  const reRenderList = () => {
    setRenderList(!renderList);
  };

  const handleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const openTeacherMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className="discussion-header-container thread">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          <h1>Ask a Question</h1>
        </div>

        <button onClick={() => history.push("/challenge")}>Back</button>
      </div>

      <div className="thread-container">
        <div
          className="thread-question"
          style={{
            background: "#3a3c42",
            padding: "1rem",
            position: "relative",
          }}
        >
          <div className="question-header">
            <div className="name">{username}</div>
            <div className="created-at" style={{ color: "#7d8088" }}>
              {date}
            </div>

            <div className="icons" style={{ marginRight: "1.3rem" }}>
              {!user
                ? ""
                : user.role === "Teacher" && (
                    <i
                      onClick={openTeacherMenu}
                      style={
                        isOpen
                          ? {
                              background: "#18191b",
                              padding: "1rem",
                              position: "absolute",
                              top: "0",
                              right: "0",
                              borderTopRightRadius: "6px",
                            }
                          : {}
                      }
                      className="fas fa-ellipsis-h fa-lg"
                    ></i>
                  )}
            </div>
            {isOpen && (
              <TeacherMenu
                reRenderList={reRenderList}
                question={question}
                openTeacherMenu={openTeacherMenu}
              ></TeacherMenu>
            )}
          </div>
          <div className="question-body">
            <div
              style={{
                marginBottom: "1rem",
                fontWeight: "500",
                color: "#fff",
              }}
            >
              {sanitize(question.title)}
            </div>
            {isTruncated ? (
              <Truncate
                lines={3}
                ellipsis={
                  <span>
                    ... <StyledSpan onClick={handleTruncate}>more</StyledSpan>
                  </span>
                }
                trimWhitespace="true"
                style={{ color: "#dcddde", fontWeight: "300" }}
              >
                {sanitize(question.body)}
              </Truncate>
            ) : (
              <div style={{ color: "#dcddde", fontWeight: "300" }}>
                {sanitize(question.body)}{" "}
                <StyledSpan onClick={handleTruncate}>less</StyledSpan>
              </div>
            )}
          </div>
        </div>

        {comments.map((comment, index) => {
          if (comment.isAnswer) {
            return (
              <div
                style={{ marginRight: "1.3rem" }}
                className="chosen-answer"
                key={index}
              >
                <i
                  className="fas fa-bookmark fa-lg"
                  style={{
                    float: "left",
                    margin: "2.4rem 0 0 0.5rem",
                    color: "#6271c0",
                  }}
                ></i>
                <div>
                  <CommentCard comment={comment} answer={true} />
                </div>
              </div>
            );
          }
        })}
      </div>
      <CommentsList
        comments={comments}
        questionId={questionId}
        reRenderList={reRenderList}
      />
    </Fragment>
  );
};

export default QuestionThread;
