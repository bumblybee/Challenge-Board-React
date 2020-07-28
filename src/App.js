import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import ChallengeSubmissionArea from "./components/ChallengeSubmissionArea";
import DiscussionArea from "./components/DiscussionArea";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`https://salty-anchorage-50289.herokuapp.com/questions`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div role="main" className="App">
      <Nav />
      <div role="main" className="container">
        <ChallengeSubmissionArea />
        <DiscussionArea questions={questions} />
      </div>
    </div>
  );
}

export default App;
