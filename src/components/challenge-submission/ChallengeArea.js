import React from "react";

import { StyledHeading } from "../../styles/GlobalStyledComponents";

const ChallengeArea = () => {
  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <StyledHeading>CHALLENGE #1</StyledHeading>
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

export default ChallengeArea;
