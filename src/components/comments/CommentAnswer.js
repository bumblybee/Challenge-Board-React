import React, { Fragment } from "react";
import CommentCard from "./CommentCard";
import { StyledAnswerIcon } from "./StyledComments";

const CommentAnswer = ({
  comments,
  demoteAnswer,
  updateIsAnswered,
  deleteUserComment,
}) => {
  return (
    <Fragment>
      {comments.map((comment, index) => {
        if (comment.isAnswer) {
          return (
            <div className="chosen-answer" key={index}>
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
          );
        }
      })}
    </Fragment>
  );
};

export default CommentAnswer;
