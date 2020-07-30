import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Nav from "./components/Nav";
import ChallengeSubmissionArea from "./components/ChallengeSubmissionArea";
import DiscussionArea from "./components/DiscussionArea";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    //https://salty-anchorage-50289.herokuapp.com/questions

    axios.defaults.crossDomain = true;
    axios.defaults.withCredentials = true;

    const getQuestions = async () => {
      const res = await fetch(`http://localhost:9000/questions`);
      const data = await res.json();

      setQuestions(data);
    };

    const signUpUser = async () => {
      const data = {
        username: "bartsimpson",
        email: "cowabunga@gmail.com",
        password: "eatmyshorts",
      };

      const res = await fetch("http://localhost:9000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return res;
    };

    const loginUser = async () => {
      const data = {
        email: "cowabunga@gmail.com",
        password: "eatmyshorts",
      };

      return await axios.post("http://localhost:9000/users/login", data);
    };

    const triggerPasswordReset = async (email) => {
      return await axios.post(`http://localhost:3000/users/password-reset`, {
        email,
      });
    };

    const resetPassword = async (token, newPassword) => {
      return await axios.post(
        `http://localhost:3000/users/password-reset/${token}`,
        { password: newPassword }
      );
    };

    // signUpUser()
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));

    loginUser()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    getQuestions()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
