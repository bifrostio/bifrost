import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';

export default class StationContact extends Component {
  render() {
    return (
      <ul className="contact">
        <li><Glyphicon glyph="user" /> {this.props.contact.name}</li>
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
          this.props.contact.address ?
          <li><Glyphicon glyph="home" /> {this.props.contact.address}</li> :
          null
        }
      </ul>
    );
  }
}
