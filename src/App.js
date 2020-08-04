import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getQuestions } from "./api";
import axios from "axios";
import "./App.css";
import Nav from "./components/Nav";
import ChallengePage from "./components/pages/ChallengePage";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

function App() {
  const [questions, setQuestions] = useState([]);

  // TODO: Handle signup/login prompt on landing if not signed in
  useEffect(() => {
    axios.defaults.crossDomain = true;
    axios.defaults.withCredentials = true;

    getQuestions().then((data) => setQuestions(data));

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
  }, []);

  return (
    <Router>
      <div role="main" className="App">
        <Nav />
        <Switch>
          <Route path="/signup" component={Signup}></Route>
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                setQuestions={setQuestions}
                questions={questions}
              />
            )}
          ></Route>

          <ChallengePage questions={questions} setQuestions={setQuestions} />

          <Route path="/" component={ChallengePage} exact></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
