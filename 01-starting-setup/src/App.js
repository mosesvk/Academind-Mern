import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Users from "./user/pages/Users";

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Users}/>
      <Redirect to='/' />
    </Router>
  );
};

export default App;
