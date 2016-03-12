import React, {Component} from 'react';
import { Input } from 'react-bootstrap';

export default class ContactForm extends Component {
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
        <Input value={this.props.contact.name} onChange={this.handleChange.bind(this)} id="name" type="text" label="姓名" />
        <Input value={this.props.contact.email} onChange={this.handleChange.bind(this)} id="email" type="email" label="電子郵件" />
        <Input value={this.props.contact.phone} onChange={this.handleChange.bind(this)} id="phone" type="text" label="電話" />
        <Input value={this.props.contact.note} onChange={this.handleChange.bind(this)} id="note" type="textarea" label="備註" />
      </form>
    );
  }
}
