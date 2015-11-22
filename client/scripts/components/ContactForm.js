import React, {Component} from 'react';
import { Input } from 'react-bootstrap';

export default class ContactForm extends Component {
  render() {
    return (
      <form>
        <Input type="text" label="姓名" />
        <Input type="email" label="電子郵件" />
        <Input type="text" label="電話" />
      </form>
    );
  }
}
