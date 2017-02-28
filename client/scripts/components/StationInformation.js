import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';
import StationContact from '../components/StationContact';

export default class StationInformation extends Component {
  render() {
    let contacts = this.props.station._contacts || [];
    let position = this.props.station.latitude ?
       [this.props.station.latitude, this.props.station.longitude] :
       [0, 0];

    return (
      <Row>
        <Col xs={12} md={6}>
          <h1>{this.props.station.name}</h1>
          {contacts.map((c, index) => {
            return (<StationContact key={index} contact={c} />);
          })}
        </Col>
        <Col xs={12} md={6} className="minimap">
          <Map center={position} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              subdomains='abc'
            />
            <Marker position={position}>
            </Marker>
          </Map>
        </Col>
      </Row>
    );
  }
}
