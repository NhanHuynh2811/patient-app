import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import Home from '../home';
// import LoginPage from '../login/LoginPage';
import Patients from '../content/index';
import CreatePatient from '../content/createPatient';

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" component={Home}>
            <Home />
          </Route> */}
          {/* <Route path="/login">
            <LoginPage />
          </Route> */}
          <Route exact path="/" component={Patients}>
            <Patients />
          </Route>
          <Route exact path="/create" component={CreatePatient}>
            <CreatePatient />
          </Route>
          <Route exact path="/edit/:patientId" component={CreatePatient}>
            <CreatePatient />
          </Route>
        </Switch>
      </div>
    );
  }
}
