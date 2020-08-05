import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getQuestions } from "./api/questionsApi";

import "./App.css";
import Nav from "./layout/Nav";
import Challenge from "./components/pages/Challenge";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

function App() {
  // TODO: Handle signup/login prompt on landing if not signed in
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
  }, []);

  return (
    <Router>
      <div role="main" className="App">
        <Nav />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login setQuestions={setQuestions} questions={questions} />
          </Route>

          <Route path="/challenge" exact>
            <Challenge questions={questions} setQuestions={setQuestions} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
