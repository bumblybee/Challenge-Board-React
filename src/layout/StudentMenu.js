import React, { useState, useEffect, Fragment } from "react";
import { editQuestion } from "../api/questionsApi";
import { StyledStudentMenu } from "../styles/styledComponents";
import Modal from "./Modal";

const StudentMenu = ({ openMenu, question }) => {
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState(question.title);
  const [newBody, setNewBody] = useState(question.body);

  const updateQuestion = async () => {
    const data = { title: newTitle, body: newBody };
    await editQuestion(question.id, data);
    //TODO: handle re-render.
    //TODO: check in server to be sure right user
  };

  return (
    <Fragment>
      {openModal ? (
        <Modal>
          <div className="modal-body">
            <form onSubmit={updateQuestion}>
              <input
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
                id="title"
                value={newTitle}
              />
              <textarea
                onChange={(e) => setNewBody(e.target.value)}
                style={{ resize: "none" }}
                id="body"
                rows="10"
                value={newBody}
              ></textarea>
              <button onClick={updateQuestion}>Submit</button>
              <button>Close</button>
            </form>
          </div>
        </Modal>
      ) : (
        <StyledStudentMenu>
          <p onClick={() => setOpenModal(!openModal)}>Edit Post</p>
        </StyledStudentMenu>
      )}
    </Fragment>
  );
};

export default StudentMenu;
