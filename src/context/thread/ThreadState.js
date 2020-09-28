import React, { useState } from "react";
import { ThreadContext } from "./ThreadContext";

import {
  getQuestionThread,
  updateAnswer,
  deleteQuestion,
} from "../../api/questionsApi";
import {
  createComment,
  editComment,
  deleteComment,
  selectAnswer,
  deselectAnswer,
} from "../../api/commentsApi";

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

  const updateComment = async (comment, data) => {
    const editedComment = await editComment(comment.id, data);

    if (editedComment.error) {
      return editedComment.error;
      //  setError(editedComment.error);
    } else {
      setComments(editedComment.data.comments);
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

  const promoteAnswer = async (comment) => {
    if (window.confirm("Are you sure you want to select this answer?")) {
      const updatedComments = await selectAnswer(
        comment.id,
        comment.questionId
      );

      if (updatedComments.error) {
        return updatedComments;
        //  setError(updatedComments.error);
      } else if (updatedComments.data) {
        setComments(updatedComments.data.comments);
      }
    }
  };

  const demoteAnswer = async (comment) => {
    if (window.confirm("Are you sure you want to deselect this answer?")) {
      const updatedComments = await deselectAnswer(
        comment.id,
        comment.questionId
      );

      if (updatedComments.error) {
        // setError(updatedComments.error);
        return updatedComments.error;
      } else if (updatedComments.data) {
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
        updateComment,
        deleteUserComment,
        deleteThreadQuestion,
        promoteAnswer,
        demoteAnswer,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export default ThreadState;
