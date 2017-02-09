import React, {Component} from 'react';
import { Input } from 'react-bootstrap';
import validator from 'validator';

export default class ContactForm extends Component {
  getValidationStyle(key) {
    let prop = this.props.contact[key];
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

  handleChange(e) {
    let field = e.target.id;
    let props = {
      name: this.props.contact.name,
      email: this.props.contact.email,
      phone: this.props.contact.phone,
      note: this.props.contact.note
    };
    props[field] = e.target.value;
    this.props.updateContact(props);
  }

  render() {
    return (
      <form>
        <Input
          bsStyle={this.getValidationStyle('name')}
          hasFeedback
          value={this.props.contact.name}
          onChange={this.handleChange.bind(this)}
          id="name" type="text" label="姓名 (必填)" />

        <Input
          bsStyle={this.getValidationStyle('email')}
          hasFeedback
          value={this.props.contact.email}
          onChange={this.handleChange.bind(this)}
          id="email" type="email" label="電子郵件 (必填)" />

        <Input
          bsStyle={this.getValidationStyle('phone')}
          hasFeedback
          value={this.props.contact.phone}
          onChange={this.handleChange.bind(this)}
          id="phone" type="text" label="電話 (必填，請勿輸入除了數字以外的其他字元如 +、- 或空白)" />

        <Input
          hasFeedback
          value={this.props.contact.note}
          onChange={this.handleChange.bind(this)}
          id="note" type="textarea" label="備註" />
      </form>
    );
  }
}
