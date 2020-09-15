import React from "react";
import CommentCard from "./comments/CommentCard";
import { StyledAnswerIcon } from "./comments/StyledComments";

const ThreadAnswer = ({
  comment,
  demoteAnswer,
  updateIsAnswered,
  deleteUserComment,
}) => {
  return (
    comment.isAnswer && (
      <div className="chosen-answer">
        <StyledAnswerIcon className="fas fa-bookmark fa-lg"></StyledAnswerIcon>
        <div>
          <CommentCard
            comment={comment}
            answer={true}
            demoteAnswer={demoteAnswer}
            deleteUserComment={deleteUserComment}
            updateIsAnswered={updateIsAnswered}
          />
        </div>
      </div>
    )
  );
};

export default ThreadAnswer;
