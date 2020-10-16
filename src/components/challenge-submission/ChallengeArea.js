import React from "react";

import { StyledHeading } from "../../styles/GlobalStyledComponents";

import * as sc from "./StyledChallengeArea";

const ChallengeArea = () => {
  return (
    <sc.StyledChallengeContainer>
      <sc.StyledChallengeHeader>
        <StyledHeading>CHALLENGE #1</StyledHeading>
        <h1>Turn any Design into HTML</h1>
      </sc.StyledChallengeHeader>
      <div>
        <sc.StyledVideo
          src="https://www.youtube.com/embed/mcw4AViN7jw"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="Turn Design into HTML and CSS"
          allowFullScreen
        ></sc.StyledVideo>

        <p>
          First challenge, turning any design into HTML and CSS. First
          challenge, turning any design into HTML and CSS. First challenge,
          turning any design into HTML and CSS.
        </p>
      </div>
    </sc.StyledChallengeContainer>
  );
};

export default ChallengeArea;
