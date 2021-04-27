import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";


import Board from "./components/pages/Board";
import AddBoard from "./components/pages/AddBoard";
import Ticket from "./components/pages/Ticket";
import AddTicket from "./components/pages/AddTicket";
import EditTicket from "./components/pages/EditTicket";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
  
          <Route exact path="/" component={Board} />
          <Route exact path="/boards/add" component={AddBoard} />
          <Route exact path="/ticket" component={Ticket} />
          <Route exact path="/tickets/add" component={AddTicket} />
          <Route exact path="/tickets/edit/:id" component={EditTicket} />
          <Route component={NotFound} />
          
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
