import React, {Component} from 'react';
import StationContact from 'components/StationContact';
import Provision from 'components/Provision';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Map, Marker, TileLayer } from 'react-leaflet';
import StationApi from 'utils/StationApi';

export default class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
      edit: false
    };
  }

  componentDidMount() {
    let self = this;
    StationApi.findById(this.props.params.id, (err, station) => {
      self.setState({station: station});
    });
  }

  donate() {
    this.setState({edit: !this.state.edit});
  }

  render() {
    let self = this;
    let createProvision = (provision, index) => {
      return (
        <Col key={index} xs={6} md={4}>
          <Provision
            edit={self.state.edit}
            name={provision.name}
            thumbnail={provision.thumbnail}
            total={provision.total}
            shipped={provision.shipped}
            promised={provision.promised}
            unit={provision.unit}
          />
        </Col>
      );
    };

    let contacts = this.state.station._contacts || [];
    let provisions = this.state.station.provisions || [];
    let position = this.state.station.latitude ?
                   [this.state.station.latitude, this.state.station.longitude] :
                   [0, 0];

    return (
      <Grid className="station-page">
        <Row>
          <Col xs={12} md={6}>
            <h1>{this.state.station.name}</h1>
            {contacts.map((c, index) => {
              return (<StationContact key={index} contact={c} />);
            })}
          </Col>
          <Col xs={12} md={6} className="minimap">
            <Map center={position} zoom={13}>
              <TileLayer
                attribution='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'
                subdomains='1234'
              />
              <Marker position={position}>
              </Marker>
            </Map>
          </Col>
        </Row>
        <Row>
          {provisions.map(createProvision)}
        </Row>
        <Row className="text-right">
          <Button bsStyle="primary" bsSize="large" onClick={this.donate.bind(this)}>Donate</Button>
        </Row>
      </Grid>
    );
  }
}
