import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getComments } from "../../api/commentsApi";
import CommentCard from "./CommentCard";

const QuestionThread = () => {
  const history = useHistory();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data);
    };

    fetchComments();
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
        <ul className="questions-thread">
          {comments.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default QuestionThread;
