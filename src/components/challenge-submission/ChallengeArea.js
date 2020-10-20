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
          src="https://player.vimeo.com/video/470270459"
          frameBorder="0"
          width="640"
          height="360"
          allow="autoplay;encrypted-media; fullscreen; picture-in-picture"
          title="Create an Anonymous Message Board"
          allowFullScreen
        ></sc.StyledVideo>

        <p>
          Welcome to the final challenge. You'll be using the knowledge built up
          in the challenges before this for building a server, a database, and a
          client to create an anonymous message board.
        </p>
        <p>
          The details and a general design to base your project off of are in
          the video. Deploy your project when it's done and submit both the link
          to the deployed project and your GitHub for it.
        </p>
        <p>
          Feel free to ask any question you want on this page, and it'll be
          answered either by me or my apprentice who built it.
        </p>
        <p>Good luck!</p>
      </div>
    </sc.StyledChallengeContainer>
  );
};

export default ChallengeArea;
