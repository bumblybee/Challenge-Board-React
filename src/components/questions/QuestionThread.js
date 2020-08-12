import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getQuestionThread } from "../../api/questionsApi";
import CommentCard from "./CommentCard";

const QuestionThread = () => {
  const history = useHistory();
  const location = useLocation();

  const [question, setQuestion] = useState();
  const [comments, setComments] = useState([]);
  const path = location.pathname.split("/");
  const questionId = path[path.indexOf("question") + 1];

  useEffect(() => {
    const fetchThread = async () => {
      const data = await getQuestionThread(questionId);
      setQuestion(data.question);
      setComments(data.comments);
      console.log(data);
    };

    fetchThread();
  }, []);

  return (
    <Fragment>
      <div className="discussion-header-container thread">
        <div className="discussion-header">
          <h4 className="heading">DISCUSSION</h4>
          <h1>Ask a Question</h1>
        </div>

        <button onClick={() => history.push("/challenge")}>Back</button>
      </div>

      <div className="questions-container">
        <div className="question" style={{ backgroundColor: "#3a3c42" }}>
          {question}
        </div>
        <ul className="comments-thread" style={{ backgroundColor: "#202225" }}>
          {comments.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
        </ul>
        <form>
          <input
            className="question-thread-input"
            type="text"
            placeholder="Comment"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default QuestionThread;
