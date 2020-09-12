import React, { Fragment } from "react";
import CommentCard from "./CommentCard";
import { StyledAnswerIcon } from "./StyledComments";

const ThreadAnswer = ({
  comment,
  demoteAnswer,
  updateIsAnswered,
  deleteUserComment,
}) => {
  return (
    <Fragment>
      {comment.isAnswer && (
        <div className="chosen-answer" key={comment.id}>
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
      )}
    </Fragment>
  );
};

export default ThreadAnswer;
