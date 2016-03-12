import React, {Component} from 'react';
import { Input } from 'react-bootstrap';

export default class ContactForm extends Component {
  handleChange(e) {
    let field = e.target.id;
    let props = {
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
      note: this.props.note
    };
    props[field] = e.target.value;
    this.props.updateContact(props);
  }
  render() {
    return (
      <form>
        <Input onChange={this.handleChange.bind(this)} id="name" type="text" label="姓名" />
        <Input onChange={this.handleChange.bind(this)} id="email" type="email" label="電子郵件" />
        <Input onChange={this.handleChange.bind(this)} id="phone" type="text" label="電話" />
        <Input onChange={this.handleChange.bind(this)} id="note" type="textarea" label="備註" />
      </form>
    );
  }
}
