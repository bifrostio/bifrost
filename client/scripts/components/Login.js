import React, {Component} from 'react';
import {Panel, Button, Input} from 'react-bootstrap';

export default class Login extends Component {

  render() {
    return (
      <div className="container">
        <Panel className="login-wrap" header="Login">
          <Input type="email" label="Email Address" placeholder="Enter email" />
          <Input type="password" label="Password" />
        </Panel>
      </div>
    );
  }
}
