import React, {Component} from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col} from 'react-bootstrap';

import StationContact from '../components/StationContact';
import TitleBar from '../components/TitleBar';
import UserModel from '../models/UserModel';
import RequirementModel from '../models/ProvisionRequirementModel';

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
    UserModel.getStationInfo(this.props.params.id, this.handleReqSuccess, this.handleReqFail);
  }

  addProvision(req) {
    req.stationId = this.state.station.id;
    RequirementModel.create(req, (err) => {
      if (!err) {
        UserModel.getStationInfo(this.props.params.id,
          this.handleReqSuccess, this.handleReqFail);
      }
    });
  }

  removeProvision(id) {
    RequirementModel.remove(id, (err) => {
      if (!err) {
        UserModel.getStationInfo(this.props.params.id,
          this.handleReqSuccess, this.handleReqFail);
      }
    });
  }

  saveProvision(p) {
    RequirementModel.update(p, err => {
      if (!err) {
        UserModel.getStationInfo(this.props.params.id,
          this.handleReqSuccess, this.handleReqFail);
      }
    });
  }

  handleReqSuccess(data) {
    const provisionRequirements = {};
    const batches = {};

    data.provisionRequirements.forEach( item => {
      provisionRequirements[item.id] = item;
      item.shipped = 0;
      item.promised = 0;
      item.provisionActivities.forEach(activity => {
        ['shipped', 'promised'].forEach(key => {
          if (typeof(activity[key]) === 'number') {
            item[key] += activity[key];
          }
        });
      });
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

  handleReqFail() {}

  render() {
    const station = this.state.station;
    let contacts = this.state.station._contacts || [];

    return (
      <div>
        <TitleBar />
        <div className="container">
          <Grid className="station-page">
            <Row>
              <Col xs={12} md={12}>
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
              <Link to={`/manager/station/${station.id}/activity`} activeClassName="active">點收物資</Link>
            </li>
          </ul>
          {
            this.props.children &&
            React.cloneElement(this.props.children, {
              provisionRequirements: this.state.provisionRequirements,
              batches: this.state.batches,
              addProvision: this.addProvision.bind(this),
              removeProvision: this.removeProvision.bind(this),
              saveProvision: this.saveProvision.bind(this)
            })
          }
        </div>
      </div>
    );
  }
}
