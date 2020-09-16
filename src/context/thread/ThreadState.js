import React, { useState } from "react";
import { ThreadContext } from "./ThreadContext";

import { getQuestionThread } from "../../api/questionsApi";
import { createComment } from "../../api/commentsApi";
import { deleteQuestion } from "../../api/questionsApi";

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

    //TODO: Handle error in CommentsList
    if (updatedComments.error) {
      return updatedComments.error;
    }

    setComments(updatedComments.data.comments);
  };

  const deleteThreadQuestion = async (question) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const deletedQuestion = await deleteQuestion(question.id);

      if (deletedQuestion.error) {
        return deletedQuestion.error;
        // setError(deletedQuestion.error);
        // toggleMenu();
      } else {
      }
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        comments,
        setComments,
        threadQuestion,
        fetchThread,
        submitComment,
        deleteThreadQuestion,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export default ThreadState;
