import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getQuestions } from "./api";
import axios from "axios";
import "./App.css";
import Nav from "./components/Nav";
import ChallengePage from "./pages/ChallengePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    //https://salty-anchorage-50289.herokuapp.com/questions

    axios.defaults.crossDomain = true;
    axios.defaults.withCredentials = true;

    getQuestions().then((data) => setQuestions(data));

    // const signUpUser = async () => {
    //   const data = {
    //     username: "rogerrabbit",
    //     email: "carrots@gmail.com",
    //     password: "rascally",
    //   };

    //   const res = await fetch("http://localhost:9000/users/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   return res;
    // };

    // const loginUser = async () => {
    //   const data = {
    //     email: "cowabunga@gmail.com",
    //     password: "eatmyshorts",
    //   };

    //   return await axios.post("http://localhost:9000/users/login", data);
    // };

    const triggerPasswordReset = async (email) => {
      return await axios.post(`http://localhost:9000/users/password-reset`, {
        email,
      });
    };

    const resetPassword = async (token, newPassword) => {
      return await axios.post(
        `http://localhost:9000/users/password-reset/${token}`,
        { password: newPassword }
      );
    };

    // loginUser();

    // getQuestions();
  }, []);

  return (
    <Router>
      <div role="main" className="App">
        <Nav />
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login} questions={questions}></Route>

          <ChallengePage questions={questions} />

          <Route path="/" component={ChallengePage} exact></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
