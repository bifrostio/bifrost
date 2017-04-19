import React, {Component} from 'react';
import {Panel, Button, Input} from 'react-bootstrap';
import TitleBar from '../components/TitleBar';
import UserModel from '../models/UserModel';

export default class Login extends Component {
  state = {
    error: '',
    emailError: '',
    passwordError: ''
  };

  handleLogin = (event) => {
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    let error = {};

    event.preventDefault();

    if (!email) {
      error.emailError = '請輸入帳號';
    }

    if (!password) {
      error.passwordError = '請輸入密碼';
    }

    if (Object.keys(error).length > 0) {
      this.setState(error);
    } else {
      const body = {email: email, password: password};
      UserModel.login(body, this.handleLoginSuccess, this.handleLoginFail);
    }
  }

  handleLoginSuccess = (id) => {
    sessionStorage.setItem('token', id);
    this.context.router.push('/manager/projects');
  }

  handleLoginFail = (statusCode) => {
    if (statusCode === 401) {
      // show auth error message
      this.setState({
        error: '你輸入的帳號和密碼不符。',
        emailError: '',
        passwordError: ''
      });
    }
  }

  render() {
    return (
      <div>
        <TitleBar path={this.props.route.path} />
        <div className="container">
          <Panel className="login-wrap" header="Login">
            <form onSubmit={this.handleLogin}>
              <Input type="email"
                ref="email"
                label="Email Address"
                placeholder="test@gmail.com"
                help={this.state.emailError} />
              <Input type="password"
                ref="password"
                label="Password"
                placeholder="Enter password"
                help={this.state.passwordError} />
              <div className="login-warning">{this.state.error}</div>
              <div className="btn-wrap">
                <a href="">忘記密碼?</a>
                <Button type="submit" bsStyle="primary">登入</Button>
              </div>
            </form>
          </Panel>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};
