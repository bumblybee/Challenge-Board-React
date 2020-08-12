import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getQuestionThread } from "../../api/questionsApi";
import CommentCard from "./CommentCard";

//TODO: Get rid of CSS and add Styled Components
const QuestionThread = () => {
  const history = useHistory();
  const location = useLocation();

  const [question, setQuestion] = useState({});
  const [username, setUserName] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [date, setDate] = useState("");
  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    const fetchThread = async () => {
      const data = await getQuestionThread(questionId);
      setQuestion(data.question);
      setComments(data.comments);
      setUserName(data.question.user.username);
      setDate(data.question.createdAt.split("T")[0]);
    };

    fetchThread();
  }, [questionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
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

      <div className="comments-container">
        <div
          className="question"
          style={{ background: "#3a3c42", padding: "1rem" }}
        >
          <div className="question-header">
            <div className="name">{username}</div>
            <div className="created-at">{date}</div>
            {question.isAnswered ? <i className="fas fa-bookmark"></i> : ""}
          </div>
          <div className="question-body">
            <div style={{ marginBottom: "1rem" }}>{question.title}</div>
            <div>{question.body}</div>
          </div>
        </div>
        <ul
          className="comments-thread"
          style={{ backgroundColor: "#202225", padding: "1rem" }}
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
          <input
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            style={{ background: "#18191B", border: "none" }}
            className="question-thread-input"
            type="text"
            placeholder="Comment"
          />

          <i style={{ marginLeft: "auto" }} className="fas fa-paper-plane"></i>
        </form>
      </div>
    </Fragment>
  );
};

export default QuestionThread;
