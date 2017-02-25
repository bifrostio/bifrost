import React, {Component} from 'react';
import {Panel, Button, Input} from 'react-bootstrap';
import TitleBar from '../components/TitleBar';
import UserModel from '../models/UserModel';

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: '',
      emailError: '',
      passwordError: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleLoginFail = this.handleLoginFail.bind(this);
  }

  handleLogin(event) {
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    let error = {};

    if (!email) {
      error.emailError = '請輸入帳號';
    }

    if (!password) {
      error.passwordError = '請輸入密碼';
    }

    if (Object.keys(error).length > 0) {
      this.setState(error);

      event.preventDefault();
      return;
    }

    const body = {email: email, password: password};
    UserModel.login(body, this.handleLoginSuccess, this.handleLoginFail);
  }

  handleLoginSuccess(id) {
    sessionStorage.setItem('token', id);
    this.context.router.push('projects');
  }

  handleLoginFail(statusCode) {
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
            <form>
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
                <Button type="submit" bsStyle="primary" onClick={this.handleLogin}>登入</Button>
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
