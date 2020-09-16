import React, { useState } from "react";
import { getQuestionThread } from "../../api/questionsApi";
import { ThreadContext } from "./ThreadContext";
import { createComment } from "../../api/commentsApi";

const ThreadState = ({ children }) => {
  const [threadQuestion, setThreadQuestion] = useState("");
  const [comments, setComments] = useState([]);

  const fetchThread = async (questionId) => {
    const data = await getQuestionThread(questionId);

    setThreadQuestion(data.question);

    setComments(data.question.comments);
  };

  const submitComment = async (questionId, newComment) => {
    const updatedComments = await createComment(questionId, newComment);

    if (updatedComments.error) {
      return updatedComments.error;
    }

    setComments(updatedComments.data.comments);
  };

  return (
    <ThreadContext.Provider
      value={{
        comments,
        setComments,
        threadQuestion,
        fetchThread,
        submitComment,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export default ThreadState;
