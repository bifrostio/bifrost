import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class StationContact extends Component {
  render() {
    let address = this.props.contact._address;

    if (address) {
      address = `${address.zipCode} ${address.city}${address.district}${address.detail}`;
    }

    return (
      <ul className="contact">
        {
          this.props.contact.name ?
          <li><Glyphicon glyph="user" /> {this.props.contact.name}</li> :
          null
        }
        {
          this.props.contact.phone ?
          <li><Glyphicon glyph="earphone" /> {this.props.contact.phone}</li> :
          null
        }
        {
          this.props.contact.email ?
          <li><Glyphicon glyph="envelope" /> {this.props.contact.email}</li> :
          null
        }
        {
          address ?
          <li><Glyphicon glyph="home" /> {address}</li> :
          null
        }
      </ul>
    );
  }
}
