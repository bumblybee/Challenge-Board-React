import React from "react";
import CommentCard from "./comments/CommentCard";
import { StyledAnswerIcon } from "./comments/StyledComments";

const ThreadAnswer = ({ comment }) => {
  return (
    comment.isAnswer && (
      <div className="chosen-answer">
        <StyledAnswerIcon className="fas fa-bookmark fa-lg"></StyledAnswerIcon>
        <div>
          <CommentCard comment={comment} answer={true} />
        </div>
      </div>
    )
  );
};

export default ThreadAnswer;
