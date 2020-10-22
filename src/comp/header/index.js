import React, { Component } from 'react';
import './header.scss';
import Nav from './Nav';
class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <Nav />
      </div>
    );
  }
}
export default Header;
