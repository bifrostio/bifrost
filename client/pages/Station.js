import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router';
import StationInformation from '../components/StationInformation';
import Provision from '../components/Provision';
import StationModel from '../models/StationModel';
import AidSyncModel from '../models/AidSyncModel';

export default class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
      edit: false,
      showConfirmation: false,
      donor: {},
      official: false
    };
  }

  componentDidMount() {
    let self = this;
    if (this.props.route.path.indexOf('officialStations') !== -1) {
      AidSyncModel.findById(this.props.params.id, (err, station) => {
        station.longitude = station.geometry.location.lng;
        station.latitude = station.geometry.location.lat;
        station.name = station.key;
        station._contacts = [
          {address: station.formatted_address}
        ];
        self.setState({
          official: true,
          station: station
        });
      });
    }
    else {
      StationModel.findById(this.props.params.id, (err, station) => {
        station.provisionRequirements.forEach(req => req.volume = 0);
        self.setState({station: station});
      });
    }
  }

  renderDiagramDescription() {
    if (!this.state.official) {
      return (
        <Row>
          <div className="diagram-description">
            <span><i className="shipped fa fa-circle" aria-hidden="true"></i> 已經收到的物資比例</span>
            <span><i className="promised fa fa-circle" aria-hidden="true"></i> 已認領但尚未收到的物資比例</span>
          </div>
        </Row>
      );
    }
  }

  createProvision(provision, index) {
    if (!this.state.official) {
      return (
        <Col key={index} xs={6} md={4}>
          <Provision
            index={index}
            edit={this.state.edit}
            name={provision.name}
            description={provision.description}
            category={provision.category}
            expired={provision.expired}
            thumbnail={provision.thumbnail}
            total={provision.total}
            shipped={provision.shipped}
            promised={provision.promised}
            unit={provision.unit}
          />
        </Col>
      );
    }
    else {
      let closeExpired, expired;
      if (provision.expired) {
        let d = new Date(provision.expired);
        let today = new Date();
        expired = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;

        today.setDate(1);
        today.setMonth(today.getMonth() + 6);
        closeExpired = today > d ? 'danger' : '';
      }
      else {
        expired = '無期限資訊';
      }
      return (
        <tr key={index} className={closeExpired}>
          <td>{provision.name}</td>
          <td>{provision.total}</td>
          <td>{expired}</td>
          <td>{provision.category}</td>
        </tr>
      );
    }
  }

  renderProvisions() {
    let provisions = this.state.station.provisionRequirements || [];
    if (!this.state.official) {
      return (
        <Row className="provision-items-row">
          {provisions.map(this.createProvision.bind(this))}
        </Row>
      );
    }
    else {
      return (
        <Row className="provision-items-row">
          <div className="alert alert-info" role="alert">
            標示紅色為六個月內即將過期
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>名稱</th>
                <th>數量</th>
                <th>期限</th>
                <th>分類</th>
              </tr>
            </thead>
            <tbody>
              {provisions.map(this.createProvision.bind(this))}
            </tbody>
          </table>
        </Row>
      );
    }
  }

  render() {
    let button;

    if (!this.state.official) {
      if (this.state.station.closed) {
        button = (
          <button className="btn-lg btn btn-primary" disabled="disabled">
            已結束
          </button>
        );
      }
      else {
        button = (
          <Link
            to={`/stations/${this.state.station.id}/donation`}
            className="btn-lg btn btn-primary">
            捐贈
          </Link>
        );
      }
    }

    let closedNotice;
    if (this.state.station.closed) {
      closedNotice = (
        <div className="closed-notice alert alert-info" role="alert">
          本物資站的物資募集活動已結束。
        </div>
      );
    }

    return (
      <div>
        <Grid className="station-page">
          <StationInformation station={this.state.station} />

          {closedNotice}
          {this.renderDiagramDescription()}
          {this.renderProvisions()}

          <Row className="text-right station-buttons">
            {button}
          </Row>
        </Grid>
      </div>
    );
  }
}
