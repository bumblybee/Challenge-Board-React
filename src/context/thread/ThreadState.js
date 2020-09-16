import React, { useState } from "react";
import { ThreadContext } from "./ThreadContext";

import { getQuestionThread } from "../../api/questionsApi";
import { updateAnswer } from "../../api/questionsApi";
import { createComment } from "../../api/commentsApi";
import { deleteComment } from "../../api/commentsApi";
import { deleteQuestion } from "../../api/questionsApi";

//TODO: Handle errors within components
const ThreadState = ({ children }) => {
  const [threadQuestion, setThreadQuestion] = useState("");
  const [comments, setComments] = useState([]);

  const fetchThread = async (questionId) => {
    const data = await getQuestionThread(questionId);

    setThreadQuestion(data.question);

    setComments(data.question.comments);
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

  const updateIsAnswered = async (comment) => {
    const updatedQuestion = await updateAnswer(comment.questionId);

    if (updatedQuestion.error) {
      //  setError(updatedQuestion.error);
      return updatedQuestion.error;
    }
  };

  const submitComment = async (questionId, newComment) => {
    const updatedComments = await createComment(questionId, newComment);

    if (updatedComments.error) {
      return updatedComments.error;
    } else {
      setComments(updatedComments.data.comments);
    }
  };

  const deleteUserComment = async (comment) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const updatedComments = await deleteComment(
        comment.id,
        comment.questionId
      );

      if (updatedComments.error) {
        //  setError(updatedComments.error);
        return updatedComments.error;
      } else {
        comment.isAnswer && updateIsAnswered(comment);

        setComments(updatedComments.data.comments);
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
        deleteUserComment,
        deleteThreadQuestion,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export default ThreadState;
