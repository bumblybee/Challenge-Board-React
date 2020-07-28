import React from "react";

const SubmissionSection = () => {
  return (
    <div className="submission-container">
      <h4 className="heading">SUBMISSION</h4>
      <h1>Submit Your Project</h1>
      <p>When you're ready, submit your Github link here for review.</p>
      <button className="modal-button" id="submit-button">
        Submit Project
      </button>
    </div>
  );
};

export default SubmissionSection;
