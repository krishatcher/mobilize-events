import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Switch } from 'react-router-dom';
import EventsList from "./components/event-list.component";

class App extends Component {
  render() {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Events List
            </Link>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/events"]} component={EventsList} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
