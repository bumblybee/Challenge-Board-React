import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { editQuestion } from "../api/questionsApi";
import { StyledStudentMenu } from "../styles/styledComponents";
import Modal from "./Modal";

const StudentMenu = ({ openMenu, question }) => {
  const history = useHistory();

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.body);
  // console.log(question);

  const updateQuestion = async (e) => {
    e.preventDefault();
    const data = { title: title, body: body, userId: question.userId };
    const sendUpdate = await editQuestion(question.id, data);
    //TODO: handle re-render so whole app isn't affected
    setOpenModal(!openModal);
    sendUpdate && history.push("/");
    //TODO: handle not logged in / not right user
    //TODO: handle error
  };

  return (
    <Fragment>
      {openModal ? (
        <Modal>
          <div className="modal-body">
            <form onSubmit={updateQuestion}>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                value={title}
              />
              <textarea
                onChange={(e) => setBody(e.target.value)}
                style={{ resize: "none" }}
                id="body"
                rows="10"
                value={body}
              ></textarea>
              <button>Submit</button>
              <button onClick={() => setOpenModal(!openModal)}>Close</button>
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
