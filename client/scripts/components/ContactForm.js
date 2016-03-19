import React, {Component} from 'react';
import { Input } from 'react-bootstrap';
import validator from 'validator';

export default class ContactForm extends Component {
  validationState(key) {
    var prop = this.props.contact[key];
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
        <Input bsStyle={this.validationState('name')} hasFeedback value={this.props.contact.name} onChange={this.handleChange.bind(this)} id="name" type="text" label="姓名" />
        <Input bsStyle={this.validationState('email')} hasFeedback value={this.props.contact.email} onChange={this.handleChange.bind(this)} id="email" type="email" label="電子郵件" />
        <Input bsStyle={this.validationState('phone')} hasFeedback value={this.props.contact.phone} onChange={this.handleChange.bind(this)} id="phone" type="text" label="電話" />
        <Input hasFeedback value={this.props.contact.note} onChange={this.handleChange.bind(this)} id="note" type="textarea" label="備註" />
      </form>
    );
  }
}
