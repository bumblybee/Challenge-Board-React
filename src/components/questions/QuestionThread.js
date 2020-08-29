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
import StudentMenu from "../../layout/StudentMenu";
import {
  StyledSpan,
  StyledMenuIcon,
  StyledAnswerIcon,
  StyledThreadQuestion,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledDateDiv,
} from "./StyledQuestions";

//TODO: add access to student menu in main question and answer
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

  const renderMenu = () => {
    if (user.role === "Teacher" || user.id === question.userId) {
      return (
        <StyledMenuIcon
          isOpen={isOpen}
          inList={false}
          onClick={toggleMenu}
          className="fas fa-ellipsis-h fa-lg"
        ></StyledMenuIcon>
      );
    } else {
      return null;
    }
  };

  const toggleMenu = () => {
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
        <StyledThreadQuestion className="thread-question">
          <div className="question-header">
            <div className="name">{username}</div>
            <StyledDateDiv className="created-at">{date}</StyledDateDiv>

            <div className="icons" style={{ marginRight: "1.3rem" }}>
              {user && renderMenu()}
            </div>
            {isOpen && user.role === "Teacher" ? (
              <TeacherMenu
                reRenderList={reRenderList}
                question={question}
                toggleMenu={toggleMenu}
                // coming from thread, so want to push user back to home after delete
                thread={true}
              ></TeacherMenu>
            ) : isOpen && user.role === "Student" ? (
              <StudentMenu
                question={question}
                toggleMenu={toggleMenu}
                reRenderList={reRenderList}
              ></StudentMenu>
            ) : (
              ""
            )}
          </div>
          <div className="question-body">
            <StyledQuestionTitle>
              {sanitize(question.title)}
            </StyledQuestionTitle>
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
              <StyledQuestionText>
                {sanitize(question.body)}{" "}
                <StyledSpan onClick={handleTruncate}>less</StyledSpan>
              </StyledQuestionText>
            )}
          </div>
        </StyledThreadQuestion>

        {comments.map((comment, index) => {
          if (comment.isAnswer) {
            return (
              <div
                style={{ marginRight: "1.3rem" }}
                className="chosen-answer"
                key={index}
              >
                <StyledAnswerIcon className="fas fa-bookmark fa-lg"></StyledAnswerIcon>
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
