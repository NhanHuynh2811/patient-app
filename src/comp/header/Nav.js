import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Nav extends Component {
  render() {
    return (
      <div>
        <div className="nav-container">
          {/* <Link to="/">Home</Link> */}
          <Link to="/">Patients</Link>
        </div>
      </div>
    );
  }
}
