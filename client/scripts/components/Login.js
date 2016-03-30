import React, {Component} from 'react';
import {Panel, Button, Input} from 'react-bootstrap';
import ManagerApi from 'utils/ManagerApi';
import Titlebar from 'components/Titlebar';

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

  handleLogin() {
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();

    if (!email) {
      this.setState({
          error: '',
          emailError: '請輸入帳號',
          passwordError: ''
      });

      return;
    }

    if (!password) {
      this.setState({
          error: '',
          emailError: '',
          passwordError: '請輸入密碼'
      });

      return;
    }

    const body = {email: email, password: password};
    ManagerApi.login(body, this.handleLoginSuccess, this.handleLoginFail);
  }

  handleLoginSuccess(id) {
    sessionStorage.setItem("token", id);
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
    } else {
    }
  }

  render() {
    return (
      <div>
        <Titlebar path={this.props.route.path} />
        <div className="container">
          <Panel className="login-wrap" header="Login">
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
              <Button bsStyle="primary" onClick={this.handleLogin}>登入</Button>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};
