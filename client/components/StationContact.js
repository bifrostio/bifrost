import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class StationContact extends Component {
  renderRow(icon, text) {
    if (text) {
      return <li><Glyphicon glyph={icon} /> {text}</li>;
    }
  }

  render() {
    let address = this.props.contact._address;

    if (address) {
      address = `${address.zipCode} ${address.city}${address.district}${address.detail}`;
    }

    return (
      <ul className="contact">
        {this.renderRow('user', this.props.contact.name)}
        {this.renderRow('earphone', this.props.contact.phone)}
        {this.renderRow('envelope', this.props.contact.email)}
        {this.renderRow('home', address)}
      </ul>
    );
  }
}
