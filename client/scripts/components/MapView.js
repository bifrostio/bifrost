import React, {Component} from 'react';
import {Link} from 'react-router';
import StationMap from './StationMap';
import ReactDOM from 'react-dom';
import StationList from './StationList';
import StationApi from '../utils/StationApi';
import AidSyncApi from '../utils/AidSyncApi';
import { Button } from 'react-bootstrap';
import debug from 'debug';

let log = debug('bifrost:MapView');

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [],
      officialStations: [],
      selected: null,
      showOfficialStations: false
    };
  }

  componentDidMount() {
    let self = this;
    StationApi.find((err, stations) => {
      self.setState({ stations: stations});
    });
    AidSyncApi.getOfficialStations((err, officialStations) => {
      let stationsList = Object.keys(officialStations).map(name => {
        return officialStations[name];
      });
      self.setState({officialStations: stationsList});
    });
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(stationId) {
    this.setState({selected: stationId});
  }

  handleOfficialStations(bool) {
    this.setState({showOfficialStations: bool});
  }

  render() {
    let markers = [];
    let stations = [];

    this.state.stations.forEach(station => {
      markers.push({
        key: station.id,
        position: [station.latitude, station.longitude],
        children: (<a href={`/#/stations/${station.id}`}>{station.name}</a>)
      });

      let promised = 0;
      let shipped = 0;
      station.provisionRequirements.forEach(req => {
        log(req.name, `shipped: ${req.shipped}, promised: ${req.promised}`);
        shipped += req.shipped / req.total;
        promised += req.promised / req.total;
      });
      station.shippedPercentage = shipped / station.provisionRequirements.length;
      station.promisedPercentage = promised / station.provisionRequirements.length;
      stations.push(station);
    });

    if (this.state.showOfficialStations) {
      this.state.officialStations.forEach((station, i) => {
        let location = station.geometry.location;
        markers.push({
          key: 'official-' + i,
          position: [location.lat, location.lng],
          children: (<a href={`/#/officialStations/${station.key}`}>{station.name}</a>)
        });
      });
    }

    return (
      <div>
        <StationList
          showOfficialStations={this.state.showOfficialStations}
          stations={stations}
          handleOfficialStations={this.handleOfficialStations.bind(this)}
          officialStations={this.state.officialStations}
          onHover={this.handleHover} />
        <StationMap markers={markers} selected={this.state.selected} />
        <Link to="login" className="btn btn-primary login-btn">登入</Link>
      </div>
    );
  }
}
