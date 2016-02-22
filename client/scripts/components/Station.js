import React, {Component} from 'react';
import StationContact from 'components/StationContact';
import Provision from 'components/Provision';
import $ from 'jquery';
import { Glyphicon } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {}
    };
  }

  componentDidMount() {
    let self = this;
    $.get(`/api/stations/${this.props.params.id}`).done(data => {
      self.setState({station: data});
    });
  }

  render() {
    // let createProvision = (provision, index) => {
    //   return (
    //     <Provision key={index}
    //       name={provision.name}
    //       thumbnail={provision.thumbnail}
    //       total={provision.total}
    //       shipped={provision.shipped}
    //       promised={provision.promised}
    //       unit={provision.unit}
    //     />
    //   );
    // };

    return (
      <Grid>
        <Row>
          <Col xs={12} md={9}>
            <h1>{this.state.station.name}</h1>
          </Col>
          <Col xs={12} md={3}>
            Map
          </Col>
        </Row>
      </Grid>
    );
    /*
    return (
      <div>
        <h1>{this.state.station.contact.stationName}</h1>
        <StationContact contact={this.state.station.contact} />
        <Grid>
          <Row>
            {this.state.station.provisions.map(createProvision)}
          </Row>
        </Grid>
      </div>
    );
    */
  }
}
