import React, {Component} from 'react';
import { Link } from 'react-router';
import StationContact from 'components/StationContact';
import Provision from 'components/Provision';
import { ButtonGroup, Alert, Grid, Row, Col, Button} from 'react-bootstrap';
import StationApi from 'utils/StationApi';

export default class StationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
    };
  }

  componentDidMount() {
    let self = this;
    StationApi.findById(this.props.params.id, (err, station) => {
      self.setState({station: station});
    });
  }

  render() {
    let self = this;

    let contacts = this.state.station._contacts || [];
    let provisions = this.state.station.provisionRequirements || [];
    let position = this.state.station.latitude ?
                   [this.state.station.latitude, this.state.station.longitude] :
                   [0, 0];
    return (
      <div className="container">
        <Grid className="station-page">
          <Row>
            <Col xs={12} md={6}>
              <h1>{this.state.station.name}</h1>
              {contacts.map((c, index) => {
                return (<StationContact key={index} contact={c} />);
              })}
            </Col>
          </Row>
        </Grid>

        <ul className="nav nav-tabs">
          <li>
            <Link to={`/manager/station/${this.state.station.id}/requirement`} activeClassName="active">需求物資清單</Link>
          </li>
          <li>
            <Link to={`/manager/station/${this.state.station.id}/activity`} activeClassName="active">捐贈物資清單</Link>
          </li>
        </ul>
        {
          this.props.children &&
          React.cloneElement(this.props.children, {
            provisions: provisions
          })
        }
      </div>
    );
  }
}
