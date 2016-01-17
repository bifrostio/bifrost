import React, {Component} from 'react';
import StationContact from 'components/StationContact';
import Provision from 'components/Provision';
import { Glyphicon } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Station extends Component {

  render() {
    let createProvision = (provision, index) => {
      return (
        <Provision key={index}
          name={provision.name}
          thumbnail={provision.thumbnail}
          total={provision.total}
          shipped={provision.shipped}
          promised={provision.promised}
          unit={provision.unit}
        />
      );
    };

    return (
      <div>
        <h1>{this.props.contact.stationName}</h1>
        <StationContact contact={this.props.contact} />
        <Grid>
          <Row>
            {this.props.provisions.map(createProvision)}
          </Row>
        </Grid>
      </div>
    );
  }
}
