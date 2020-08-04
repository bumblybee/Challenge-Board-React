import React from "react";

const ChallengeSection = () => {
  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <h4 className="heading">CHALLENGE #1</h4>
        <h1>Turn any Design into HTML</h1>
      </div>
      <div className="challenge-video-area">
        <iframe
          src="https://www.youtube.com/embed/mcw4AViN7jw"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="Turn Design into HTML and CSS"
          allowFullScreen
        ></iframe>

        <p>
          First challenge, turning any design into HTML and CSS. First
          challenge, turning any design into HTML and CSS. First challenge,
          turning any design into HTML and CSS.
        </p>
      </div>
    </div>
  );
};

export default ChallengeSection;
