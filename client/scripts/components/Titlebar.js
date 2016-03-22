import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Titlebar extends Component {
  render() {
    let adminLink;
    if (this.props.path !== 'login') {
      adminLink = (<NavItem eventKey={2} href="/#/projects">後台首頁</NavItem>);
    }
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/#/">物資捐贈地圖</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/#/">前台首頁</NavItem>
            {adminLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
