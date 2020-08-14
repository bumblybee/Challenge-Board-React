import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import TextareaAutosize from "react-autosize-textarea";

import { getQuestionThread, createComment } from "../../api/questionsApi";
import CommentCard from "./CommentCard";

//TODO: Get rid of CSS and add Styled Components
const QuestionThread = () => {
  const [question, setQuestion] = useState({});
  const [username, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ body: "", isAnswered: false });
  const [isSubmitted, setIsSubmitted] = useState(false);
  //TODO: This is silly - bring in Moment JS
  const [date, setDate] = useState("");

  const history = useHistory();
  const location = useLocation();

  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    const fetchThread = async () => {
      const data = await getQuestionThread(questionId);
      setQuestion(data.question);
      setComments(data.question.comments);
      setUserName(data.question.user.username);
      setDate(data.question.createdAt.split("T")[0]);
    };

    fetchThread();
  }, [questionId, isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment(questionId, newComment);
    //Set isSubmitted to true to call api again and get comments
    setIsSubmitted(true);
    //Clear input
    setNewComment({ ...newComment, body: "" });
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
          style={{ background: "#3a3c42", padding: "1rem" }}
        >
          <div className="question-header">
            <div className="name">{username}</div>
            <div className="created-at">{date}</div>
            {question.isAnswered ? <i className="fas fa-bookmark"></i> : ""}
          </div>
          <div className="question-body">
            <div style={{ marginBottom: "1rem", fontWeight: "500" }}>
              {question.title}
            </div>
            <div style={{ color: "#dcddde", fontWeight: "300" }}>
              {question.body}
            </div>
          </div>
        </div>
      </div>
      <div className="comments-container">
        <ul
          className="comments-thread"
          style={{ backgroundColor: "#202225", overflow: "auto" }}
        >
          {comments.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#18191B",
            display: "flex",
            padding: "1rem",
          }}
        >
          <TextareaAutosize
            onChange={(e) =>
              setNewComment({
                ...newComment,
                body: e.target.value,
              })
            }
            value={newComment.body}
            style={{
              background: "#18191B",
              border: "none",
              outline: "none",
              color: "#fff",
              width: "80%",
              fontSize: "1rem",
              fontFamily: "Arial",
              resize: "none",
            }}
            className="question-thread-input"
            placeholder="Comment"
            rows={1}
          />

          <button
            className="submit-comment"
            style={{
              marginLeft: "auto",
              border: "none",
              background: "#18191B",
            }}
            type="submit"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default QuestionThread;
