import React, {Component} from 'react';
import { Link } from 'react-router';
import StationContact from 'components/StationContact';
import Provision from 'components/Provision';
import { ButtonGroup, Alert, Grid, Row, Col, Button} from 'react-bootstrap';
import ManagerApi from 'utils/ManagerApi';

export default class StationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
      provisionRequirements: {},
      batches: []
    };

    this.handleReqSuccess = this.handleReqSuccess.bind(this);
    this.handleReqFail = this.handleReqFail.bind(this);
  }

  componentWillMount() {
    ManagerApi.getStationInfo(this.props.params.id, this.handleReqSuccess, this.handleReqFail);
  }

  handleReqSuccess(data) {
    debugger;
    const provisionRequirements = {};
    const batches = {};

    data.provisionRequirements.forEach( item => {
      provisionRequirements[item.id] = item;
    });

    data.batches.forEach( item => {
      batches[item.id] = item;
    });

    this.setState({
        station: {id: data.id, name: data.name, _contacts: data._contacts},
        provisionRequirements: provisionRequirements,
        batches: batches
    });

  }

  handleReqFail(statue) {
  }

  render() {
    const station = this.state.station;
    let contacts = this.state.station._contacts || [];

    return (
      <div className="container">
        <Grid className="station-page">
          <Row>
            <Col xs={12} md={6}>
              <h1>{station.name}</h1>
              {contacts.map((c, index) => {
                return (<StationContact key={index} contact={c} />);
              })}
            </Col>
          </Row>
        </Grid>

        <ul className="nav nav-tabs">
          <li>
            <Link to={`/manager/station/${station.id}/requirement`} activeClassName="active">需求物資清單</Link>
          </li>
          <li>
            <Link to={`/manager/station/${station.id}/activity`} activeClassName="active">捐贈物資清單</Link>
          </li>
        </ul>
        {
          this.props.children &&
          React.cloneElement(this.props.children, {
            provisionRequirements: this.state.provisionRequirements,
            batches: this.state.batches
          })
        }
      </div>
    );
  }
}
