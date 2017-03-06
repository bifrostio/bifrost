import React, {Component} from 'react';
import { Input } from 'react-bootstrap';
import validator from 'validator';
import WizardButtons from './WizardButtons';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {contact: this.props.contact};
    this.handleChange = this.handleChange.bind(this);
    this.forward = this.forward.bind(this);
  }
  getValidationStyle(key) {
    let prop = this.state.contact[key];
    if (typeof(prop) === 'undefined') {
      return;
    }
    else if (key === 'email') {
      return validator.isEmail(prop) ? 'success' : 'error';
    }
    else if (key === 'phone') {
      return validator.isNumeric(prop) ? 'success' : 'error';
    }
    else if (typeof(prop) === 'string') {
      return prop.length > 0 ? 'success' : 'error';
    }
  }

  disableForward() {
    let contact = this.state.contact;
    if (!contact.name || !contact.phone || !contact.email) {
      return true;
    }

    if (!validator.isEmail(contact.email)) {
      return true;
    }

    if (!validator.isNumeric(contact.phone)) {
      return true;
    }

    return false;
  }

  forward() {
    this.props.forward(this.state.contact);
  }

  handleChange(e) {
    let field = e.target.id;
    let contact = this.state.contact;
    contact[field] = e.target.value;
    this.setState({contact});
  }

  render() {
    return (
      <form>
        <Input
          bsStyle={this.getValidationStyle('name')}
          hasFeedback
          value={this.state.contact.name}
          onChange={this.handleChange}
          id="name" type="text" label="姓名 (必填)" />

        <Input
          bsStyle={this.getValidationStyle('email')}
          hasFeedback
          value={this.state.contact.email}
          onChange={this.handleChange}
          id="email" type="email" label="電子郵件 (必填)" />

        <Input
          bsStyle={this.getValidationStyle('phone')}
          hasFeedback
          value={this.state.contact.phone}
          onChange={this.handleChange}
          id="phone" type="text" label="電話 (必填，請勿輸入除了數字以外的其他字元如 +、- 或空白)" />

        <Input
          hasFeedback
          value={this.state.contact.note}
          onChange={this.handleChange}
          id="note" type="textarea" label="備註" />

        <div className="alert alert-info" role="alert">若需要開立紙本捐物收據，請於備註欄位填寫您的地址。（如欲抵稅須同時檢具收據及原始採購或進貨單據）</div>

        <WizardButtons
          disableForward={this.disableForward()}
          forward={this.forward}
          back={this.props.back}
        />
      </form>
    );
  }
}
